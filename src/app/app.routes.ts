import { Routes } from '@angular/router';
import { authRoutes } from './auth/auth.routes';
import { studentRoutes } from './features/student/student.routes';
import { homeRoutes } from './features/home/home.routes';

export const routes: Routes = [
  ...authRoutes,
  ...studentRoutes,
  ...homeRoutes
];