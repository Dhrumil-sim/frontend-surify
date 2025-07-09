import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { UserHomePageComponent } from './pages/user/user-home-page/user-home-page.component';
import { AdminHomePageComponent } from './pages/admin/admin-home-page/admin-home-page.component';
import { DiscoverComponent } from './pages/user/discover/discover.component';
import { RecentlyPlayedComponent } from './pages/user/recently-played/recently-played.component';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'user-dashboard',
    component: UserHomePageComponent,
    canActivate: [authGuard],
    children: [
      { path: 'discover', component: DiscoverComponent },
      { path: 'recent', component: RecentlyPlayedComponent },
      {
        path: 'playlists',
        loadComponent: () =>
          import('./components/user/dashboard/playlist/playlist-list.component').then((m) => m.PlaylistListComponent),
      },
      { path: '', redirectTo: 'discover', pathMatch: 'full' },
    ],
  },
  { path: 'admin-dashboard', component: AdminHomePageComponent },
];
