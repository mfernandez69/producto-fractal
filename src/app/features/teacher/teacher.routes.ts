import { Routes } from "@angular/router";
import { privateGuard } from "../../auth/guards/auth.guard";
import { roleGuard } from "../../auth/guards/role.guard";

export const teachertRoutes: Routes = [
    {
        path: 'teacher',
        canActivate: [privateGuard(), roleGuard(['teacher'])],
        children: [
            {
                path: '',
                loadComponent: () => import('./layout/layout.component'),
            }
        ],
    }
];