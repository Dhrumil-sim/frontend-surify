import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { CommonModule } from '@angular/common';

interface MenuItem {
  label: string;
  icon: string;
  route: string;
  isActive: boolean;
}

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [RouterModule, MatIconModule, MatListModule, MatDividerModule, CommonModule],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.css',
})
export class SideBarComponent implements OnInit {
  menuItems: MenuItem[] = [
    {
      label: 'Discover',
      icon: 'explore',
      route: '/user-dashboard/discover',
      isActive: false,
    },
    {
      label: 'My Library',
      icon: 'library_music',
      route: '/user-dashboard/library',
      isActive: false,
    },
    {
      label: 'Playlists',
      icon: 'queue_music',
      route: '/user-dashboard/playlists',
      isActive: false,
    },
    {
      label: 'Favorites',
      icon: 'favorite',
      route: '/user-dashboard/favorites',
      isActive: false,
    },
    {
      label: 'Recently Played',
      icon: 'history',
      route: '/user-dashboard/recent',
      isActive: false,
    },
    {
      label: 'Collaborative',
      icon: 'group',
      route: '/user-dashboard/collaborative',
      isActive: false,
    },
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.updateActiveRoute();
  }

  onMenuItemClick(item: MenuItem): void {
    this.menuItems.forEach((menuItem) => (menuItem.isActive = false));
    item.isActive = true;
    this.router.navigate([item.route]);
  }

  private updateActiveRoute(): void {
    const currentRoute = this.router.url;
    this.menuItems.forEach((item) => {
      item.isActive =
        currentRoute === item.route ||
        (currentRoute === '/user-dashboard' && item.route === '/user-dashboard/discover');
    });
  }
}
