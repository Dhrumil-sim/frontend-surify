// login.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

// Angular Material Imports
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
  ],
  template: `
    <div class="login-container">
      <mat-card class="login-card">
        <mat-card-header>
          <mat-card-title>
            <mat-icon>music_note</mat-icon>
            Music Streaming Login
          </mat-card-title>
        </mat-card-header>

        <mat-card-content>
          <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Email</mat-label>
              <input
                matInput
                type="email"
                formControlName="email"
                placeholder="Enter your email"
                [class.mat-input-invalid]="loginForm.get('email')?.invalid && loginForm.get('email')?.touched" />
              <mat-icon matSuffix>email</mat-icon>
              <mat-error *ngIf="loginForm.get('email')?.hasError('required')"> Email is required </mat-error>
              <mat-error *ngIf="loginForm.get('email')?.hasError('email')">
                Please enter a valid email address
              </mat-error>
            </mat-form-field>

            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Password</mat-label>
              <input
                matInput
                [type]="hidePassword ? 'password' : 'text'"
                formControlName="password"
                placeholder="Enter your password"
                [class.mat-input-invalid]="loginForm.get('password')?.invalid && loginForm.get('password')?.touched" />
              <button
                mat-icon-button
                matSuffix
                type="button"
                (click)="hidePassword = !hidePassword"
                [attr.aria-label]="'Hide password'"
                [attr.aria-pressed]="hidePassword">
                <mat-icon>{{ hidePassword ? 'visibility_off' : 'visibility' }}</mat-icon>
              </button>
              <mat-error *ngIf="loginForm.get('password')?.hasError('required')"> Password is required </mat-error>
              <mat-error *ngIf="loginForm.get('password')?.hasError('minlength')">
                Password must be at least 6 characters long
              </mat-error>
            </mat-form-field>

            <div class="button-container">
              <button
                mat-raised-button
                color="primary"
                type="submit"
                [disabled]="loginForm.invalid || isLoading"
                class="login-button">
                <mat-spinner *ngIf="isLoading" diameter="20" class="spinner"> </mat-spinner>
                <mat-icon *ngIf="!isLoading">login</mat-icon>
                {{ isLoading ? 'Logging in...' : 'Login' }}
              </button>
            </div>
          </form>
        </mat-card-content>
      </mat-card>

      <!-- API Response Display -->
      <mat-card *ngIf="apiResponse" class="response-card success-card">
        <mat-card-header>
          <mat-card-title>
            <mat-icon color="primary">check_circle</mat-icon>
            Login Successful
          </mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <h4>API Response:</h4>
          <pre class="response-content">{{ apiResponse | json }}</pre>
        </mat-card-content>
      </mat-card>

      <!-- Error Display -->
      <mat-card *ngIf="errorMessage" class="response-card error-card">
        <mat-card-header>
          <mat-card-title>
            <mat-icon color="warn">error</mat-icon>
            Login Failed
          </mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <p>{{ errorMessage }}</p>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [
    `
      .login-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        min-height: 100vh;
        padding: 20px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      }

      .login-card {
        width: 100%;
        max-width: 400px;
        margin-top: 50px;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
        border-radius: 16px;
      }

      .login-card mat-card-header {
        text-align: center;
        padding-bottom: 20px;
      }

      .login-card mat-card-title {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
        font-size: 24px;
        color: #333;
      }

      .full-width {
        width: 100%;
        margin-bottom: 16px;
      }

      .button-container {
        display: flex;
        justify-content: center;
        margin-top: 20px;
      }

      .login-button {
        width: 100%;
        height: 48px;
        font-size: 16px;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
      }

      .spinner {
        margin-right: 8px;
      }

      .response-card {
        width: 100%;
        max-width: 400px;
        margin-top: 20px;
        border-radius: 12px;
      }

      .success-card {
        border-left: 4px solid #4caf50;
        background-color: #f1f8e9;
      }

      .success-card mat-card-title {
        color: #2e7d32;
        display: flex;
        align-items: center;
        gap: 8px;
      }

      .error-card {
        border-left: 4px solid #f44336;
        background-color: #ffebee;
      }

      .error-card mat-card-title {
        color: #c62828;
        display: flex;
        align-items: center;
        gap: 8px;
      }

      .error-card p {
        color: #c62828;
        margin: 0;
      }

      .response-content {
        background-color: #ffffff;
        border: 1px solid #e0e0e0;
        border-radius: 8px;
        padding: 16px;
        overflow-x: auto;
        white-space: pre-wrap;
        font-family: 'Courier New', monospace;
        font-size: 14px;
        line-height: 1.4;
        margin: 0;
      }

      h4 {
        margin: 0 0 12px 0;
        color: #2e7d32;
        font-weight: 500;
      }

      /* Responsive Design */
      @media (max-width: 480px) {
        .login-container {
          padding: 10px;
        }

        .login-card {
          margin-top: 20px;
        }
      }

      /* Custom Material Theme Overrides */
      ::ng-deep .mat-mdc-form-field-outline {
        border-radius: 8px;
      }

      ::ng-deep .mat-mdc-raised-button {
        border-radius: 8px;
      }

      ::ng-deep .mat-mdc-card {
        border-radius: 16px;
      }
    `,
  ],
})
export class LoginComponent {
  loginForm: FormGroup;
  isLoading = false;
  apiResponse: unknown = null;
  errorMessage: string = '';
  hidePassword = true;

  // Replace with your actual backend API URL
  private apiUrl = 'http://localhost:5000/api/user/login'; // Change this to your backend URL

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private snackBar: MatSnackBar
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.apiResponse = null;
      this.errorMessage = '';

      const loginData = {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password,
      };

      console.log('Sending login request:', loginData);

      this.http.post(this.apiUrl, loginData).subscribe({
        next: (response) => {
          this.isLoading = false;
          this.apiResponse = response;
          console.log('Login successful:', response);

          // Show success snackbar
          this.snackBar.open('Login successful!', 'Close', {
            duration: 3000,
            panelClass: ['success-snackbar'],
          });
        },
        error: (error) => {
          this.isLoading = false;
          this.errorMessage = error.error?.message || 'Login failed. Please try again.';
          console.error('Login error:', error);

          // Show error snackbar
          this.snackBar.open('Login failed. Please check your credentials.', 'Close', {
            duration: 5000,
            panelClass: ['error-snackbar'],
          });
        },
      });
    } else {
      // Mark all fields as touched to show validation errors
      Object.keys(this.loginForm.controls).forEach((key) => {
        this.loginForm.get(key)?.markAsTouched();
      });

      this.snackBar.open('Please fill in all required fields correctly.', 'Close', {
        duration: 3000,
        panelClass: ['warning-snackbar'],
      });
    }
  }

  // Method to get specific error message for a field
  getErrorMessage(fieldName: string): string {
    const field = this.loginForm.get(fieldName);
    if (field?.hasError('required')) {
      return `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is required`;
    }
    if (field?.hasError('email')) {
      return 'Please enter a valid email address';
    }
    if (field?.hasError('minlength')) {
      return `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} must be at least 6 characters long`;
    }
    return '';
  }
}
