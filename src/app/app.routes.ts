import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { UserHomePageComponent } from './pages/user/user-home-page/user-home-page.component';
import { AdminHomePageComponent } from './pages/admin/admin-home-page/admin-home-page.component';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'user-dashboard',
    component: UserHomePageComponent,
    canActivate: [authGuard],
    children: [],
  },
  { path: 'admin-dashboard', component: AdminHomePageComponent },
];
