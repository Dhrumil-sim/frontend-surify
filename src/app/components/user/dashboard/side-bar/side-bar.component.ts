import { Component } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

interface MenuItem {
  icon: string;
  label: string;
  route: string;
  active: boolean;
}

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css'],
  imports: [MatButtonModule, MatIconModule, MatListModule, MatDividerModule, MatSidenavModule, CommonModule],
})
export class SideBarComponent {
  isExpanded = true;

  menuItems: MenuItem[] = [
    { icon: 'home', label: 'Home', route: '/user-dashboard', active: true },
    { icon: 'search', label: 'Discover', route: '/user-dashboard/discover', active: false },
    { icon: 'queue_music', label: 'My Playlists', route: '/user-dashboard/playlists', active: false },
    { icon: 'favorite', label: 'Favorites', route: '/user-dashboard/favorites', active: false },
    { icon: 'history', label: 'Recently Played', route: '/user-dashboard/history', active: false },
    { icon: 'group', label: 'Collaborative', route: '/user-dashboard/collaborative', active: false },
    { icon: 'person', label: 'Profile', route: '/user-dashboard/profile', active: false },
  ];

  constructor(private router: Router) {}

  toggleSidebar() {
    this.isExpanded = !this.isExpanded;
  }

  onMenuItemClick(item: MenuItem) {
    // Update active state
    this.menuItems.forEach((menuItem) => (menuItem.active = false));
    item.active = true;

    // Navigate to route
    this.router.navigate([item.route]);
  }
}
