import { Component } from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {HomeComponent} from '../home/home.component';
import {LayananComponent} from '../layanan/layanan.component';
import {StrukturTimComponent} from '../struktur-tim/struktur-tim.component';
import {PembayaranComponent} from '../pembayaran/pembayaran.component';
import {TestimoniComponent} from '../testimoni/testimoni.component';
import {ChatKonsultasiComponent} from '../chat-konsultasi/chat-konsultasi.component';

@Component({
  selector: 'app-navigation',
  imports: [
    RouterLink,
    RouterLinkActive,
    RouterOutlet
  ],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css'
})
export class NavigationComponent {
  static readonly ROUTER = 'navigation';
  static readonly NAVIGATE = '/navigation';

  protected readonly HomeComponent = HomeComponent;
  protected readonly LayananComponent = LayananComponent;
  protected readonly StrukturTimComponent = StrukturTimComponent;
  protected readonly PembayaranComponent = PembayaranComponent;
  protected readonly TestimoniComponent = TestimoniComponent;
  protected readonly ChatKonsultasiComponent = ChatKonsultasiComponent;
}
