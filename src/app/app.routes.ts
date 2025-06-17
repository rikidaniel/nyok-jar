import { Routes } from '@angular/router';
import {HomeComponent} from './pages/user/home/home.component';
import {LoginComponent} from './pages/admin/login/login.component';
import {AdminHomeComponent} from './pages/admin/admin-home/admin-home.component';
import {AdminGuard} from '../authGuard/AdminGuard';
import {ConsultationListComponent} from './pages/admin/consultation-list/consultation-list.component';
import {NavigationComponent} from './pages/user/navigation/navigation.component';
import {LayananComponent} from './pages/user/layanan/layanan.component';
import {PembayaranComponent} from './pages/user/pembayaran/pembayaran.component';
import {StrukturTimComponent} from './pages/user/struktur-tim/struktur-tim.component';
import {TestimoniComponent} from './pages/user/testimoni/testimoni.component';
import {ChatKonsultasiComponent} from './pages/user/chat-konsultasi/chat-konsultasi.component';

export const routes: Routes = [
  { path: LoginComponent.ROUTER, component: LoginComponent },

  {
    path: NavigationComponent.ROUTER,
    component: NavigationComponent,
    children: [
      { path: HomeComponent.ROUTER, component: HomeComponent },
      { path: LayananComponent.ROUTER, component: LayananComponent },
      { path: PembayaranComponent.ROUTER, component: PembayaranComponent },
      { path: StrukturTimComponent.ROUTER, component: StrukturTimComponent },
      { path: TestimoniComponent.ROUTER, component: TestimoniComponent },
      { path: ChatKonsultasiComponent.ROUTER, component: ChatKonsultasiComponent },
      { path: '', redirectTo: HomeComponent.ROUTER, pathMatch: 'full' }
    ]
  },

  {
    path: AdminHomeComponent.ROUTER,
    component: AdminHomeComponent,
    canActivate: [AdminGuard],
    children: [
      {
        path: ConsultationListComponent.ROUTER,
        component: ConsultationListComponent,
        canActivate: [AdminGuard]
      }
    ]
  },

  { path: '', redirectTo: `${NavigationComponent.ROUTER}/${HomeComponent.ROUTER}`, pathMatch: 'full' },
  { path: '**', redirectTo: `${NavigationComponent.ROUTER}/${HomeComponent.ROUTER}` },
];

