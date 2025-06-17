import { Component } from '@angular/core';
import {Rating} from 'primeng/rating';
import {Card} from 'primeng/card';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-testimoni',
  imports: [
    Rating,
    Card,
    FormsModule
  ],
  templateUrl: './testimoni.component.html',
  styleUrl: './testimoni.component.css'
})
export class TestimoniComponent {
  static readonly ROUTER = 'testimoni';
  static readonly NAVIGATE = '/navigation/testimoni';

  ratingValue: number = 5; // Nilai untuk 5 bintang

}
