import { Routes } from '@angular/router';
import {HomeComponent} from './pages/user/home/home.component';
import {LoginComponent} from './pages/admin/login/login.component';
import {AdminHomeComponent} from './pages/admin/admin-home/admin-home.component';
import {AdminGuard} from '../authGuard/AdminGuard';
import {ConsultationListComponent} from './pages/admin/consultation-list/consultation-list.component';

export const routes: Routes = [
  { path: LoginComponent.ROUTER, component: LoginComponent },

  { path: HomeComponent.ROUTER, component: HomeComponent },
  { path: AdminHomeComponent.ROUTER, component: AdminHomeComponent, canActivate: [AdminGuard],
    children: [
      { path: ConsultationListComponent.ROUTER, component: ConsultationListComponent, canActivate: [AdminGuard]},
    ]
  },

  { path: '**', redirectTo: HomeComponent.NAVIGATE, pathMatch: 'full' },

];
