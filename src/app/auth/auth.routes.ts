import { Routes } from '@angular/router';
import { publicGuard } from './guards/auth.guard';
import { LoginComponent } from '@mfernandez69/fractal-library';

export const authRoutes: Routes = [
  {
    path: 'auth',
    //canActivate: [publicGuard()],
    children: [
      {
        path: 'login',
        loadComponent: () => Promise.resolve(LoginComponent)
      }
    ]
  }
];
