import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { map, switchMap, of } from 'rxjs';
import { AuthStateService } from '../services/auth-state.service';
import { AuthService } from '../services/auth.service';

export const roleGuard = (allowedRoles: string[]): CanActivateFn => {
  return () => {
    const router = inject(Router);
    const authState = inject(AuthStateService);
    const authService = inject(AuthService);

    return authState.authState$.pipe(
      switchMap((user) => {
        if (!user) {
          // No authenticated user, redirect to login
          router.navigate(['/auth/login']);
          return of(false);
        }

        // Get the user role from Firestore
        return authService.getUserRole(user.uid).then((role) => {
          if (allowedRoles.includes(role)) {
            return true; // Allow access if role is permitted
          } else {
            // Redirect based on user role
            if (role === 'admin') {
              router.navigate(['/admin']);
            } else if (role === 'student') {
              router.navigate(['/student']);
            } else if (role === 'teacher') {
              router.navigate(['/teacher']);
            } else {
              router.navigate(['/auth/login']);
            }
            return false; // Block access if role is not permitted
          }
        });
      }),
      map((result) => result || false) // Ensure we return a boolean
    );
  };
};