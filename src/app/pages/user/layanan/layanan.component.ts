import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {NgIf} from '@angular/common';
import {finalize} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../../environments/environment.prod';

@Component({
  selector: 'app-layanan',
  imports: [
    FormsModule,
    NgIf
  ],
  templateUrl: './layanan.component.html',
  styleUrl: './layanan.component.css'
})
export class LayananComponent {
  static readonly ROUTER = 'layanan';
  static readonly NAVIGATE = '/navigation/layanan';


  // Accordion: tidak ada yang terbuka di awal
  activeIndex: number | null = null;

  // Generator Poin Presentasi
  presentationTopic: string = '';
  generatedPoints: string = '';
  isLoading: boolean = false;
  errorMessage: string = '';
  copySuccessMessage: string = '';

  private readonly GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';
  private readonly GEMINI_API_KEY = environment.geminiApiKey;

  constructor(private http: HttpClient) {}

  toggleAccordion(index: number): void {
    this.activeIndex = this.activeIndex === index ? null : index;
  }

  generatePresentationPoints(): void {
    if (!this.presentationTopic.trim() || this.isLoading) {
      this.errorMessage = 'Topik presentasi tidak boleh kosong.';
      return;
    }

    this.isLoading = true;
    this.generatedPoints = '';
    this.errorMessage = '';
    this.copySuccessMessage = '';

    const headers = new HttpHeaders().set('x-goog-api-key', this.GEMINI_API_KEY);
    const prompt = `
      Anda adalah asisten AI yang membantu mahasiswa mempersiapkan presentasi skripsi.
      Berdasarkan topik: "${this.presentationTopic}"

      Buatkan 3 poin utama presentasi:
      1. Pendahuluan (latar belakang, tujuan)
      2. Metode (jenis penelitian, teknik analisis)
      3. Hasil dan rekomendasi

      Gunakan format poin-poin rapi, singkat, dan jelas.
    `;

    const body = {
      contents: [
        { parts: [{ text: prompt }] }
      ],
      generationConfig: {
        temperature: 0.7,
        topK: 1,
        topP: 1,
        maxOutputTokens: 1024
      }
    };

    this.http.post<any>(this.GEMINI_API_URL, body, { headers })
      .pipe(finalize(() => this.isLoading = false))
      .subscribe({
        next: (res) => {
          try {
            this.generatedPoints = res.candidates?.[0]?.content?.parts?.[0]?.text ?? '';
          } catch (e) {
            this.errorMessage = 'Gagal membaca respon dari AI.';
          }
        },
        error: (err) => {
          this.errorMessage = 'Gagal menghasilkan poin dari AI.';
        }
      });
  }

  copyOutput(): void {
    navigator.clipboard.writeText(this.generatedPoints).then(() => {
      this.copySuccessMessage = 'Berhasil disalin!';
      setTimeout(() => this.copySuccessMessage = '', 2000);
    });
  }

}
