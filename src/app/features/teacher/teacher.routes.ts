import { Routes } from "@angular/router";
import { privateGuard } from "../../auth/guards/auth.guard";

export const teachertRoutes: Routes = [
    {
        path: 'teacher',
        canActivate: [privateGuard()],
        children: [
            {
                path: '',
                loadComponent: () => import('./layout/layout.component'),
            }
        ],
    }
];