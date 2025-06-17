import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {Accordion, AccordionContent, AccordionHeader, AccordionPanel, AccordionTab} from 'primeng/accordion';
import {Textarea} from 'primeng/textarea';
import {Button} from 'primeng/button';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-layanan',
  imports: [
    FormsModule,
    Accordion,
    Textarea,
    Button,
    NgIf,
    AccordionPanel,
    AccordionHeader,
    AccordionContent
  ],
  templateUrl: './layanan.component.html',
  styleUrl: './layanan.component.css'
})
export class LayananComponent {
  static readonly ROUTER = 'layanan';
  static readonly NAVIGATE = '/navigation/layanan';


  // Indeks dari item yang sedang aktif/terbuka
  activeIndex: number | null = 3; // Item ke-4 (indeks 3) terbuka secara default

  // Data untuk AI Generator (tetap sama)
  presentationTopic: string = '';
  generatedPoints: string = '';
  isLoading: boolean = false;
  errorMessage: string = '';
  copySuccessMessage: string = '';

  // Fungsi untuk membuka/menutup item accordion
  toggleAccordion(index: number): void {
    if (this.activeIndex === index) {
      // Jika item yang sama diklik lagi, tutup item tersebut
      this.activeIndex = null;
    } else {
      // Jika item lain diklik, buka item tersebut
      this.activeIndex = index;
    }
  }

  // Fungsi untuk AI Generator (tetap sama)
  generatePresentationPoints(): void {
    if (!this.presentationTopic.trim()) {
      this.errorMessage = 'Topik presentasi tidak boleh kosong!';
      return;
    }
    this.isLoading = true;
    this.generatedPoints = '';
    this.errorMessage = '';
    this.copySuccessMessage = '';
    setTimeout(() => {
      this.generatedPoints = `Poin-poin untuk "${this.presentationTopic}":\n\n1. Latar Belakang Masalah.\n2. Analisis Situasi.\n3. Strategi Implementasi.`;
      this.isLoading = false;
    }, 1500);
  }

  copyOutput(): void {
    navigator.clipboard.writeText(this.generatedPoints).then(() => {
      this.copySuccessMessage = 'Berhasil disalin!';
      setTimeout(() => this.copySuccessMessage = '', 2000);
    });
  }

}
