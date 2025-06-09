import { Injectable } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { map, switchMap, of } from 'rxjs';

import { AuthService } from '../services/auth.service';
import { AuthStateService } from '../../shared/services/auth-state.service';

export const privateGuard = (): CanActivateFn => {
  return () => {
    const router = inject(Router);
    const authState = inject(AuthStateService);
    const authService = inject(AuthService);
    
    return authState.authState$.pipe(
      switchMap((user) => {
        if (!user) {
          router.navigate(['/auth/login']);
          return of(false);
        }
        
        // Get the user role from the service
        return authService.getUserRole(user.uid).then((role) => {
          if (role === 'admin' || role === 'student' || role === 'teacher') {
            return true;
          } else {
            router.navigate(['/auth/login']);
            return false;
          }
        });
      })
    );
  };
};

export const publicGuard = (): CanActivateFn => {
  return () => {
    const router = inject(Router);
    const authState = inject(AuthStateService);
    const authService = inject(AuthService);
    
    return authState.authState$.pipe(
      switchMap((user) => {
        if (!user) {
          return of(true); // Allow access if not authenticated
        }
        
        // Get user role and redirect accordingly
        return authService.getUserRole(user.uid).then((role) => {
          if (role === 'admin') {
            router.navigate(['/admin']);
          } else if (role === 'student') {
            router.navigate(['/student']);
          } else if (role === 'teacher') {
            router.navigate(['/teacher']);
          }
          return false; // Block access to public routes for authenticated users
        });
      })
    );
  };
};