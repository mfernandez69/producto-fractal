import { Routes } from "@angular/router";
import { privateGuard } from "../../auth/guards/auth.guard";

export const homeRoutes: Routes = [
    {
        path: '',
        children: [
            {
                path: '',
                loadComponent: () => import('./layout/layout.component'),
            }
        ],
    }
];