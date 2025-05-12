import { Routes } from '@angular/router';
import { authRoutes } from './auth/auth.routes';
import { studentRoutes } from './features/student/student.routes';

export const routes: Routes = [
  ...authRoutes,
  ...studentRoutes
];