import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Subject, takeUntil } from 'rxjs';

// Material imports
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ComponentLoaderComponent } from '../../shared/directives/component-loader.directive';
import { LoaderService } from '../../core/services/loader.service.ts.service';

// Custom imports

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    ComponentLoaderComponent,
    HttpClientModule,
  ],
  template: `
    <div class="login-container">
      <mat-card class="login-card">
        <mat-card-header>
          <mat-card-title>Login</mat-card-title>
        </mat-card-header>

        <mat-card-content>
          <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Email</mat-label>
              <input matInput type="email" formControlName="email" />
              <mat-error *ngIf="loginForm.get('email')?.hasError('required')"> Email is required </mat-error>
              <mat-error *ngIf="loginForm.get('email')?.hasError('email')"> Please enter a valid email </mat-error>
            </mat-form-field>

            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Password</mat-label>
              <input matInput type="password" formControlName="password" />
              <mat-error *ngIf="loginForm.get('password')?.hasError('required')"> Password is required </mat-error>
            </mat-form-field>

            <div class="button-section">
              <button mat-raised-button color="primary" type="submit" [disabled]="loginForm.invalid" class="full-width">
                Login
              </button>

              <button
                mat-raised-button
                color="accent"
                type="button"
                (click)="loginWithGlobalLoader()"
                [disabled]="loginForm.invalid"
                class="full-width"
                style="margin-top: 10px;">
                Login with Global Loader
              </button>
            </div>
          </form>

          <!-- Component Level Loader -->
          <app-component-loader [isLoading]="isComponentLoading" message="Authenticating user...">
          </app-component-loader>

          <!-- API Response Display -->
          <div class="response-section" *ngIf="apiResponse">
            <h4>API Response:</h4>
            <pre>{{ apiResponse | json }}</pre>
          </div>

          <div class="error-section" *ngIf="errorMessage">
            <p>{{ errorMessage }}</p>
          </div>
        </mat-card-content>
      </mat-card>

      <!-- Example Card Component with its own loader -->
      <mat-card class="example-card">
        <mat-card-header>
          <mat-card-title>User Profile Card</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <button mat-button color="primary" (click)="loadUserProfile()">Load Profile</button>

          <app-component-loader [isLoading]="isProfileLoading" message="Loading user profile...">
          </app-component-loader>

          <div *ngIf="userProfile">
            <h4>Profile Data:</h4>
            <pre>{{ userProfile | json }}</pre>
          </div>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [
    `
      .login-container {
        max-width: 500px;
        margin: 20px auto;
        padding: 20px;
      }

      .login-card,
      .example-card {
        margin-bottom: 20px;
      }

      .full-width {
        width: 100%;
        margin-bottom: 16px;
      }

      .button-section {
        margin: 20px 0;
      }

      .response-section,
      .error-section {
        margin-top: 20px;
        padding: 15px;
        border-radius: 4px;
      }

      .response-section {
        background-color: #d4edda;
        border: 1px solid #c3e6cb;
      }

      .error-section {
        background-color: #f8d7da;
        border: 1px solid #f5c6cb;
      }

      pre {
        background-color: #f8f9fa;
        padding: 10px;
        border-radius: 4px;
        overflow-x: auto;
      }
    `,
  ],
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  apiResponse: unknown = null;
  errorMessage: string = '';
  userProfile: unknown = null;

  // Component-specific loading states
  isComponentLoading = false;
  isProfileLoading = false;

  private destroy$ = new Subject<void>();
  private apiUrl = 'http://localhost:5000/api/user/login';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private loaderService: LoaderService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  ngOnInit() {
    // Subscribe to component loader for this specific component
    this.loaderService
      .getComponentLoader('login-component')
      .pipe(takeUntil(this.destroy$))
      .subscribe((isLoading) => {
        this.isComponentLoading = isLoading;
      });

    this.loaderService
      .getComponentLoader('profile-component')
      .pipe(takeUntil(this.destroy$))
      .subscribe((isLoading) => {
        this.isProfileLoading = isLoading;
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // Regular login with component-level loader
  onSubmit() {
    if (this.loginForm.valid) {
      const loginData = this.loginForm.value;

      // Use component-level loader
      this.loaderService.handleComponentApiCall('login-component', this.http.post(this.apiUrl, loginData)).subscribe({
        next: (response) => {
          this.apiResponse = response;
          this.errorMessage = '';
        },
        error: (error) => {
          this.errorMessage = error.error?.message || 'Login failed';
          this.apiResponse = null;
        },
      });
    }
  }

  // Login with global loader
  loginWithGlobalLoader() {
    if (this.loginForm.valid) {
      const loginData = this.loginForm.value;

      // Use global loader
      this.loaderService.handleApiCall(this.http.post(this.apiUrl, loginData)).subscribe({
        next: (response) => {
          this.apiResponse = response;
          this.errorMessage = '';
        },
        error: (error) => {
          this.errorMessage = error.error?.message || 'Login failed';
          this.apiResponse = null;
        },
      });
    }
  }

  // Example of component-specific loader for different functionality
  loadUserProfile() {
    // Simulate API call
    this.loaderService
      .handleComponentApiCall('profile-component', this.http.get('http://localhost:3000/api/user/profile'))
      .subscribe({
        next: (profile) => {
          this.userProfile = profile;
        },
        error: (error) => {
          console.error('Profile loading failed:', error);
        },
      });
  }
}
