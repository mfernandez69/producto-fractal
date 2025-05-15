import { Routes } from "@angular/router";
import { privateGuard } from "../../auth/guards/auth.guard";
import { roleGuard } from "../../auth/guards/role.guard";

export const studentRoutes: Routes = [
    {
        path: 'student',
        canActivate: [privateGuard(), roleGuard(['student'])],
        children: [
            {
                path: '',
                loadComponent: () => import('./layout/layout.component'),
            }
        ],
    }
];