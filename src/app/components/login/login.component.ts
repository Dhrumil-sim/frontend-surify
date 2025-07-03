import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

// Material modules
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoaderService } from '../../core/services/loader.service.ts.service';
import { AuthResponse, User } from '../../shared/interfaces/userInterfaces/user.intrface';

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
    MatCheckboxModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    HttpClientModule,
  ],
  templateUrl: 'login.component.html',
  styleUrl: 'login.component.css',
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  apiResponse: AuthResponse | null = null;
  errorMessage: string = '';
  successMessage: string = '';
  userProfile: User | null = null;

  isComponentLoading = false;
  isProfileLoading = false;
  hidePassword = true;
  loadingMessage: string = '';
  isDevelopment = true; // Set based on environment

  private destroy$ = new Subject<void>();
  private apiUrl = 'http://localhost:5000/api/user/login';
  private router = inject(Router);

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private loaderService: LoaderService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit(): void {
    this.loaderService
      .getComponentLoader('login-component')
      .pipe(takeUntil(this.destroy$))
      .subscribe((isLoading) => {
        this.isComponentLoading = isLoading;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const loginData = this.loginForm.value;
      this.successMessage = '';
      this.errorMessage = '';
      this.loadingMessage = 'Authenticating...';

      this.loaderService.handleApiCall(this.http.post<AuthResponse>(this.apiUrl, loginData)).subscribe({
        next: (response: AuthResponse) => {
          this.apiResponse = response;

          if (response.success) {
            const accessToken = response.data.accessToken;
            const refreshToken = response.data.refreshToken;
            const role = response.data.user.role;

            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', refreshToken);
            localStorage.setItem('role', role);
            localStorage.setItem('userProfile', JSON.stringify(response.data.user));

            this.userProfile = response.data.user;
            this.successMessage = 'Login successful. Redirecting...';
            this.errorMessage = '';

            // Navigate based on role
            setTimeout(() => {
              if (role === 'user') {
                this.router.navigate(['/user-dashboard']);
              } else {
                this.router.navigate(['/admin-dashboard']);
              }
            }, 1000);
          } else {
            this.errorMessage = response.message || 'Login failed';
            this.successMessage = '';
          }
        },
        error: (error) => {
          this.apiResponse = null;
          this.errorMessage = error.error?.message || 'Login failed';
          this.successMessage = '';
          console.error('Login error:', error);
        },
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

  clearError(): void {
    this.errorMessage = '';
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('accessToken');
  }

  logout(): void {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('userProfile');
    this.userProfile = null;
    this.apiResponse = null;
    this.router.navigate(['/login']);
  }
}
