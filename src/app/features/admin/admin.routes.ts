import { Routes } from "@angular/router";
import { privateGuard } from "../../auth/guards/auth.guard";

export const adminRoutes: Routes = [
    {
        path: 'admin',
        canActivate: [privateGuard()],
        children: [
            {
                path: '',
                loadComponent: () => import('./layout/layout.component'),
            }
        ],
    }
];