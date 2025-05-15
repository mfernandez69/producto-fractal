import { Routes } from '@angular/router';
import { authRoutes } from './auth/auth.routes';
import { studentRoutes } from './features/student/student.routes';
import { homeRoutes } from './features/home/home.routes';
import { teachertRoutes } from './features/teacher/teacher.routes';
import { adminRoutes } from './features/admin/admin.routes';

export const routes: Routes = [
  ...authRoutes,
  ...studentRoutes,
  ...homeRoutes,
  ...teachertRoutes,
  ...adminRoutes
];