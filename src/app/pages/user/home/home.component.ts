import { Component } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../../environments/environment.prod';
import {catchError, finalize, map, of} from 'rxjs';
import {FormsModule} from '@angular/forms';
import {NgIf} from '@angular/common';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [
    FormsModule,
    RouterLink,
    NgIf
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  static readonly ROUTER = 'home';
  static readonly NAVIGATE = '/navigation/home';

  // --- KONFIGURASI ---
  // ⚠️ Ganti dengan API Key Anda. Jangan gunakan di produksi!
  private readonly GEMINI_API_KEY = "MASUKKAN_API_KEY_GEMINI_ANDA";
  private readonly GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';

  // --- State Management ---
  userInput: string = '';
  aiResult: string = 'Ide yang dihasilkan AI akan muncul di sini.';
  isLoading: boolean = false;
  isInitialState: boolean = true;
  errorMessage: string | null = null;

  constructor(private http: HttpClient) { }

  generateIdeas() {
    if (!this.userInput.trim() || this.isLoading) {
      this.errorMessage = 'Topik tidak boleh kosong.';
      return;
    }

    // Reset state untuk memulai request baru
    this.isLoading = true;
    this.isInitialState = false;
    this.errorMessage = null;
    this.aiResult = ''; // Kosongkan hasil sebelumnya

    // Siapkan Headers dan Body untuk API Gemini
    const headers = new HttpHeaders().set('x-goog-api-key', environment.geminiApiKey);
    const prompt = `
      Anda adalah seorang asisten ahli yang membantu mahasiswa menemukan ide skripsi di Indonesia.
      Berdasarkan topik kasar berikut: "${this.userInput}"

      Berikan 3 ide judul skripsi yang spesifik.
      Untuk setiap ide, sertakan:
      1.  **Judul Skripsi:**
      2.  **Rumusan Masalah:** (1-2 kalimat)
      3.  **Pertanyaan Penelitian:** (2-3 pertanyaan kunci)

      Format jawaban dalam bentuk teks biasa yang rapi dengan poin-poin.
    `;

    const body = {
      contents: [{
        parts: [{ text: prompt }]
      }],
      generationConfig: {
        temperature: 0.7,
        topK: 1,
        topP: 1,
        maxOutputTokens: 2048,
      }
    };

    // Kirim request ke API Gemini
    this.http.post<any>(this.GEMINI_API_URL, body, { headers })
      .pipe(
        finalize(() => this.isLoading = false) // Matikan loading setelah selesai
      )
      .subscribe({
        next: (response) => {
          try {
            // Ekstrak teks dari respons Gemini yang kompleks
            this.aiResult = response.candidates[0].content.parts[0].text;
          } catch (e) {
            this.errorMessage = "Gagal mem-parsing respons dari AI.";
            console.error("Parsing error:", e);
          }
        },
        error: (err) => {
          console.error("API Error:", err);
          this.errorMessage = `Gagal terhubung ke AI. (Error: ${err.statusText})`;
        }
      });
  }

}
