// sidebar.component.ts
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatBadgeModule } from '@angular/material/badge';

export interface MenuItem {
  id: string;
  label: string;
  icon: string;
  route: string;
  badge?: number;
  disabled?: boolean;
  children?: MenuItem[];
}

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    MatDividerModule,
    MatTooltipModule,
    MatBadgeModule,
  ],
  template: `
    <div class="sidebar-container" [class.expanded]="isExpanded" [class.collapsed]="!isExpanded">
      <!-- Sidebar Header -->
      <div class="sidebar-header">
        <div class="logo-section" *ngIf="isExpanded">
          <mat-icon class="logo-icon">dashboard</mat-icon>
          <span class="logo-text">{{ appName }}</span>
        </div>
        <button
          mat-icon-button
          (click)="toggleSidebar()"
          class="toggle-button"
          [matTooltip]="isExpanded ? 'Collapse sidebar' : 'Expand sidebar'"
          matTooltipPosition="right">
          <mat-icon>{{ isExpanded ? 'chevron_left' : 'chevron_right' }}</mat-icon>
        </button>
      </div>

      <!-- Navigation Menu -->
      <nav class="sidebar-nav">
        <mat-nav-list>
          <ng-container *ngFor="let item of menuItems; trackBy: trackByMenuItem">
            <!-- Main Menu Item -->
            <mat-list-item
              [routerLink]="item.route"
              routerLinkActive="active"
              [class.disabled]="item.disabled"
              [matTooltip]="!isExpanded ? item.label : ''"
              matTooltipPosition="right"
              class="nav-item">
              <mat-icon matListItemIcon [matBadge]="item.badge" matBadgeColor="warn">
                {{ item.icon }}
              </mat-icon>

              <span *ngIf="isExpanded" class="nav-label">{{ item.label }}</span>

              <!-- Expand/Collapse icon for items with children -->
              <mat-icon
                *ngIf="isExpanded && item.children && item.children.length > 0"
                class="expand-icon"
                [class.rotated]="isSubmenuOpen(item.id)">
                expand_more
              </mat-icon>
            </mat-list-item>

            <!-- Submenu Items -->
            <div
              *ngIf="isExpanded && item.children && item.children.length > 0 && isSubmenuOpen(item.id)"
              class="submenu">
              <mat-list-item
                *ngFor="let child of item.children"
                [routerLink]="child.route"
                routerLinkActive="active"
                [class.disabled]="child.disabled"
                class="nav-item submenu-item">
                <mat-icon matListItemIcon>{{ child.icon }}</mat-icon>
                <span class="nav-label">{{ child.label }}</span>
              </mat-list-item>
            </div>
          </ng-container>
        </mat-nav-list>
      </nav>

      <!-- User Section -->
      <div class="sidebar-user" *ngIf="showUserSection">
        <mat-divider></mat-divider>
        <div class="user-info" *ngIf="isExpanded">
          <div class="user-avatar">
            <mat-icon>account_circle</mat-icon>
          </div>
          <div class="user-details">
            <span class="user-name">{{ userName }}</span>
            <span class="user-role">{{ userRole }}</span>
          </div>
        </div>
        <button
          mat-icon-button
          (click)="onLogout()"
          [matTooltip]="isExpanded ? 'Logout' : 'Logout'"
          matTooltipPosition="right"
          class="logout-button">
          <mat-icon>logout</mat-icon>
        </button>
      </div>

      <!-- Footer Section -->
      <div class="sidebar-footer" *ngIf="isExpanded && showFooter">
        <mat-divider></mat-divider>
        <div class="footer-content">
          <span class="version">{{ version }}</span>
          <span class="copyright">© 2024 {{ appName }}</span>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .sidebar-container {
        display: flex;
        flex-direction: column;
        height: 100vh;
        background: var(--mat-sidenav-container-background-color, #fafafa);
        border-right: 1px solid var(--mat-divider-color, #e0e0e0);
        transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        width: 280px;
        min-width: 280px;
        overflow: hidden;
      }

      .sidebar-container.collapsed {
        width: 64px;
        min-width: 64px;
      }

      .sidebar-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 16px 12px;
        border-bottom: 1px solid var(--mat-divider-color, #e0e0e0);
        min-height: 64px;
      }

      .logo-section {
        display: flex;
        align-items: center;
        gap: 12px;
        flex: 1;
      }

      .logo-icon {
        color: var(--mat-primary-color, #1976d2);
        font-size: 28px;
        width: 28px;
        height: 28px;
      }

      .logo-text {
        font-size: 18px;
        font-weight: 600;
        color: var(--mat-primary-color, #1976d2);
      }

      .toggle-button {
        flex-shrink: 0;
      }

      .sidebar-nav {
        flex: 1;
        overflow-y: auto;
        padding: 8px 0;
      }

      .nav-item {
        margin: 2px 8px;
        border-radius: 8px;
        cursor: pointer;
        transition: all 0.2s ease;
        position: relative;
      }

      .nav-item:hover {
        background-color: var(--mat-option-hover-state-layer-color, rgba(0, 0, 0, 0.04));
      }

      .nav-item.active {
        background-color: var(--mat-primary-color, #1976d2);
        color: white;
      }

      .nav-item.active .mat-icon {
        color: white;
      }

      .nav-item.disabled {
        opacity: 0.6;
        cursor: not-allowed;
        pointer-events: none;
      }

      .nav-label {
        font-weight: 500;
        font-size: 14px;
      }

      .expand-icon {
        margin-left: auto;
        transition: transform 0.2s ease;
      }

      .expand-icon.rotated {
        transform: rotate(180deg);
      }

      .submenu {
        padding-left: 16px;
        background-color: var(--mat-option-hover-state-layer-color, rgba(0, 0, 0, 0.02));
      }

      .submenu-item {
        padding-left: 24px;
        font-size: 13px;
      }

      .sidebar-user {
        border-top: 1px solid var(--mat-divider-color, #e0e0e0);
        padding: 16px 12px;
      }

      .user-info {
        display: flex;
        align-items: center;
        gap: 12px;
        margin-bottom: 12px;
      }

      .user-avatar {
        flex-shrink: 0;
      }

      .user-avatar .mat-icon {
        font-size: 32px;
        width: 32px;
        height: 32px;
        color: var(--mat-primary-color, #1976d2);
      }

      .user-details {
        display: flex;
        flex-direction: column;
        gap: 2px;
        flex: 1;
        min-width: 0;
      }

      .user-name {
        font-weight: 600;
        font-size: 14px;
        color: var(--mat-primary-text-color, #333);
      }

      .user-role {
        font-size: 12px;
        color: var(--mat-secondary-text-color, #666);
      }

      .logout-button {
        width: 100%;
        justify-content: flex-start;
      }

      .sidebar-footer {
        border-top: 1px solid var(--mat-divider-color, #e0e0e0);
        padding: 16px 12px;
      }

      .footer-content {
        display: flex;
        flex-direction: column;
        gap: 4px;
        font-size: 12px;
        color: var(--mat-secondary-text-color, #666);
        text-align: center;
      }

      .version {
        font-weight: 500;
      }

      /* Dark mode support */
      @media (prefers-color-scheme: dark) {
        .sidebar-container {
          background: var(--mat-sidenav-container-background-color, #1e1e1e);
          border-color: var(--mat-divider-color, #333);
        }

        .sidebar-header {
          border-color: var(--mat-divider-color, #333);
        }

        .sidebar-user {
          border-color: var(--mat-divider-color, #333);
        }

        .sidebar-footer {
          border-color: var(--mat-divider-color, #333);
        }
      }

      /* Responsive design */
      @media (max-width: 768px) {
        .sidebar-container {
          position: fixed;
          top: 0;
          left: 0;
          z-index: 1000;
          transform: translateX(-100%);
          transition: transform 0.3s ease;
        }

        .sidebar-container.mobile-open {
          transform: translateX(0);
        }
      }
    `,
  ],
})
export class SideBarComponent implements OnInit {
  @Input() isExpanded: boolean = true;
  @Input() menuItems: MenuItem[] = [];
  @Input() appName: string = 'My App';
  @Input() userName: string = 'John Doe';
  @Input() userRole: string = 'Administrator';
  @Input() version: string = '1.0.0';
  @Input() showUserSection: boolean = true;
  @Input() showFooter: boolean = true;

  @Output() sidebarToggle = new EventEmitter<boolean>();
  @Output() menuItemClick = new EventEmitter<string>();
  @Output() logout = new EventEmitter<void>();

  private openSubmenus = new Set<string>();

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Initialize with default menu items if none provided
    if (this.menuItems.length === 0) {
      this.menuItems = this.getDefaultMenuItems();
    }
  }

  toggleSidebar(): void {
    this.isExpanded = !this.isExpanded;
    this.sidebarToggle.emit(this.isExpanded);
  }

  onMenuItemClick(route: string): void {
    this.menuItemClick.emit(route);
    this.router.navigate([route]);
  }

  onLogout(): void {
    this.logout.emit();
  }

  isSubmenuOpen(itemId: string): boolean {
    return this.openSubmenus.has(itemId);
  }

  toggleSubmenu(itemId: string): void {
    if (this.openSubmenus.has(itemId)) {
      this.openSubmenus.delete(itemId);
    } else {
      this.openSubmenus.add(itemId);
    }
  }

  trackByMenuItem(index: number, item: MenuItem): string {
    return item.id;
  }

  private getDefaultMenuItems(): MenuItem[] {
    return [
      {
        id: 'dashboard',
        label: 'Dashboard',
        icon: 'dashboard',
        route: '/dashboard',
      },
      {
        id: 'users',
        label: 'Users',
        icon: 'people',
        route: '/users',
        badge: 3,
      },
      {
        id: 'reports',
        label: 'Reports',
        icon: 'assessment',
        route: '/reports',
        children: [
          {
            id: 'sales-report',
            label: 'Sales Report',
            icon: 'trending_up',
            route: '/reports/sales',
          },
          {
            id: 'user-report',
            label: 'User Report',
            icon: 'person_search',
            route: '/reports/users',
          },
        ],
      },
      {
        id: 'settings',
        label: 'Settings',
        icon: 'settings',
        route: '/settings',
      },
    ];
  }
}
