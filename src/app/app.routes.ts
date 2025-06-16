import { Routes } from '@angular/router';
import {HomeComponent} from './pages/home/home.component';

export const routes: Routes = [

  { path: HomeComponent.ROUTER, component: HomeComponent },

  { path: '**', redirectTo: HomeComponent.NAVIGATE, pathMatch: 'full' },

];
