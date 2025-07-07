import { Component } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css'],
  imports: [MatButtonModule, MatIconModule, MatListModule, MatDividerModule, MatSidenavModule, CommonModule],
})
export class SideBarComponent {
  isExpanded = true;

  menuItems = [
    { icon: 'dashboard', label: 'Dashboard', route: '/dashboard' },
    { icon: 'person', label: 'Profile', route: '/profile' },
    { icon: 'people', label: 'Users', route: '/users' },
    { icon: 'assessment', label: 'Reports', route: '/reports' },
    { icon: 'settings', label: 'Settings', route: '/settings' },
    { icon: 'help', label: 'Help', route: '/help' },
  ];

  toggleSidebar() {
    this.isExpanded = !this.isExpanded;
  }

  onMenuItemClick(item: unknown) {
    console.log('Menu item clicked:', item);
    // Implement navigation logic here
  }
}
