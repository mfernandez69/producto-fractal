import { Routes } from '@angular/router';
import { authRoutes } from './auth/auth.routes';

export const routes: Routes = [
  ...authRoutes,
  { path: '', loadComponent: () => import('./features/home/home-page/home-page.component').then(m => m.default) }
];