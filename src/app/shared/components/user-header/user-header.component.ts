import { Component, OnInit } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDividerModule } from '@angular/material/divider';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../interfaces/userInterfaces/user.intrface';

@Component({
  selector: 'app-user-header',
  templateUrl: './user-header.component.html',
  styleUrls: ['./user-header.component.css'],
  imports: [
    MatToolbarModule,
    MatBadgeModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatMenuModule,
    MatInputModule,
    MatDividerModule,
    CommonModule,
    FormsModule,
  ],
})
export class UserHeaderComponent implements OnInit {
  user: User | null = null;
  searchQuery: string = '';
  avatarError: boolean = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.loadUserProfile();
  }

  loadUserProfile(): void {
    const userProfile = localStorage.getItem('userProfile');
    if (userProfile) {
      this.user = JSON.parse(userProfile);
    }
  }

  onSearch(): void {
    if (this.searchQuery.trim()) {
      // Navigate to search results
      this.router.navigate(['/user-dashboard/discover'], {
        queryParams: { q: this.searchQuery },
      });
    }
  }

  onLogout(): void {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('userProfile');
    localStorage.removeItem('role');
    this.router.navigate(['/login']);
  }

  onProfile(): void {
    this.router.navigate(['/user-dashboard/profile']);
  }

  onSettings(): void {
    // Navigate to settings page
    console.log('Settings clicked');
  }

  onImageError(event: Event): void {
    // Hide the image and show the default icon when image fails to load
    this.avatarError = true;
    const imgElement = event.target as HTMLImageElement;
    imgElement.style.display = 'none';
  }

  getUserDisplayName(): string {
    return this.user?.username || 'User';
  }

  getUserEmail(): string {
    return this.user?.email || 'user@example.com';
  }

  getUserAvatar(): string {
    if (!this.user?.profile_picture || this.avatarError) {
      return '';
    }

    // Handle different profile picture path formats
    const profilePicture = this.user.profile_picture;

    // If it's already a full URL, return as is
    if (profilePicture.startsWith('http')) {
      return profilePicture;
    }

    // If it's a relative path starting with 'public/', remove 'public/' prefix
    if (profilePicture.startsWith('public/')) {
      const cleanPath = profilePicture.replace('public/', '');
      return `http://localhost:5000/${cleanPath}`;
    }

    // If it's just a filename or path, assume it's in uploads directory
    if (profilePicture && profilePicture !== 'dummy_path') {
      return `http://localhost:5000/uploads/${profilePicture}`;
    }

    // Return empty string for dummy_path or no profile picture
    return '';
  }
}
