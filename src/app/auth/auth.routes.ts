import { Routes } from '@angular/router';
import { publicGuard } from './guards/auth.guard';

export const authRoutes: Routes = [
  {
    path: 'auth',
    //canActivate: [publicGuard()],
    children: [
      {
        path: 'login',
        loadComponent: () => import('./features/login-page/login-page.component')
      }
    ]
  }
];
