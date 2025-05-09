
import { Injectable } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { map,} from 'rxjs';

import { AuthService } from '../services/auth.service';
import { AuthStateService } from '../../shared/services/auth-state.service';

export const privateGuard = (): CanActivateFn => {
  return () => {
    const router = inject(Router);
    const authState = inject(AuthStateService);
    //const authService = inject(AuthService);
    
    return authState.authState$.pipe(
        map(isAuthenticated => {
        if (isAuthenticated) {
          return true;
        }
        
        router.navigate(['/auth/login']);
        return false;
      })
    );
  };
};

export const publicGuard = (): CanActivateFn => {
  return () => {
    const router = inject(Router);
    const authService = inject(AuthService);
    
    return authService.isAuthenticated$.pipe(
      map(isAuthenticated => {
        if (isAuthenticated) {
          router.navigate(['/student/']);
          return false;
        }
        return true;
      })
    );
  };
};