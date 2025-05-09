import { Routes } from "@angular/router";
import { privateGuard } from "../../auth/guards/auth.guard";

export const studentRoutes: Routes = [
    {
        path: 'student',
        canActivate: [privateGuard()],
        children: [
            {
                path: '',
                loadComponent: () => import('./layout/layout.component'),
            }
        ],
    }
];