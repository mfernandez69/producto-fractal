import { Routes } from "@angular/router";
import { privateGuard } from "../../auth/guards/auth.guard";
import { roleGuard } from "../../auth/guards/role.guard";

export const adminRoutes: Routes = [
    {
        path: 'admin',
        canActivate: [privateGuard(), roleGuard(['admin'])],
        children: [
            {
                path: '',
                loadComponent: () => import('./layout/layout.component'),
            }
        ],
    }
];