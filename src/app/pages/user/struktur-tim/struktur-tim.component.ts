import { Component } from '@angular/core';
import {Card} from 'primeng/card';

@Component({
  selector: 'app-struktur-tim',
  imports: [
    Card
  ],
  templateUrl: './struktur-tim.component.html',
  styleUrl: './struktur-tim.component.css'
})
export class StrukturTimComponent {
  static readonly ROUTER = 'struktur-tim';
  static readonly NAVIGATE = '/navigation/struktur-tim';

}
