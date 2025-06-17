import { Component } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../../environments/environment.prod';
import {catchError, finalize, map, of} from 'rxjs';
import {FormsModule} from '@angular/forms';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [
    FormsModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  static readonly ROUTER = 'home';
  static readonly NAVIGATE = '/home';

  topic: string = '';
  generatedIdeas: string = 'Ide yang dihasilkan AI akan muncul di sini.';
  isLoading: boolean = false;

  private readonly API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${environment.geminiApiKey}`;

  constructor(private http: HttpClient) {}

  generateIdeas() {
    if (!this.topic.trim()) return;

    this.isLoading = true;
    this.generatedIdeas = 'Sedang memproses ide... 🧠';

    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    // Prompt Engineering: Memberi instruksi yang jelas kepada AI
    const prompt = `
      Anda adalah seorang asisten AI yang ahli dalam membantu mahasiswa menemukan ide skripsi.
      Berdasarkan topik kasar berikut: "${this.topic}", buatlah 3-5 ide judul skripsi yang lebih spesifik dan menarik.
      Untuk setiap ide, berikan juga beberapa contoh pertanyaan penelitian (research questions) yang relevan.
      Format jawaban dalam bentuk daftar atau poin-poin yang rapi.
    `;

    const body = {
      contents: [{
        parts: [{ text: prompt }]
      }]
    };

    this.http.post<any>(this.API_URL, body, { headers }).pipe(
      map(response => response.candidates[0]?.content?.parts[0]?.text || 'Maaf, tidak ada ide yang bisa dihasilkan saat ini.'),
      catchError(error => {
        console.error('Error calling Gemini API:', error);
        return of('Terjadi kesalahan saat menghubungi AI. Silakan coba lagi.');
      }),
      finalize(() => this.isLoading = false)
    ).subscribe(result => {
      this.generatedIdeas = result;
    });
  }

}
