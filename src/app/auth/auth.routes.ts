import { Routes } from '@angular/router';

export const authRoutes: Routes = [
  {
    //canActivateChild: [publicGuard()],
    path: 'auth',
    loadComponent: () => import('./layout/layout.component'),
    children: [
      {
        path: 'login',
        loadComponent: () => import('./features/login-page/login-page.component'),
      }
    ],
  },
];
