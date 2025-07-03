import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (): boolean | UrlTree => {
  const router = inject(Router);
  const accessToken = localStorage.getItem('accessToken');

  // If token exists, allow navigation
  if (accessToken) {
    return true;
  }

  // If not logged in, redirect to login
  return router.createUrlTree(['/login']);
};
