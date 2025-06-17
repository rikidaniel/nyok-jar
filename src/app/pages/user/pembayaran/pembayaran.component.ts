import { Component } from '@angular/core';
import {Message} from 'primeng/message';
import {Button} from 'primeng/button';
import {Card} from 'primeng/card';
import {PrimeTemplate} from 'primeng/api';

@Component({
  selector: 'app-pembayaran',
  imports: [
    Message,
    Button,
    Card,
    PrimeTemplate
  ],
  templateUrl: './pembayaran.component.html',
  styleUrl: './pembayaran.component.css'
})
export class PembayaranComponent {
  static readonly ROUTER = 'pembayaran';
  static readonly NAVIGATE = '/navigation/pembayaran';
}
