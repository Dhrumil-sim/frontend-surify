import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDividerModule } from '@angular/material/divider';

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
  ],
})
export class UserHeaderComponent {
  user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    avatar: 'assets/images/default-avatar.png',
  };

  onLogout() {
    // Implement logout logic
    console.log('Logout clicked');
  }

  onProfile() {
    // Implement profile navigation
    console.log('Profile clicked');
  }

  onSettings() {
    // Implement settings navigation
    console.log('Settings clicked');
  }
}
