import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { routes } from './app.routes';
import { environment } from '../environments/environment';

// Import dari @angular/fire
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAnalytics, getAnalytics, ScreenTrackingService, UserTrackingService } from '@angular/fire/analytics';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { getStorage, provideStorage } from '@angular/fire/storage';
import {MyPreset} from './mytheme';
import {providePrimeNG} from 'primeng/config';
import {getAuth, provideAuth} from '@angular/fire/auth';

export const appConfig: ApplicationConfig = {
  providers: [
    // Konfigurasi Inti Angular
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withHashLocation()),
    provideHttpClient(withFetch()),
    provideAnimationsAsync(),

    // Konfigurasi Firebase
    provideAnalytics(() => getAnalytics()),

    provideAuth(() => getAuth()),

    // Service tambahan untuk Analytics agar terintegrasi dengan Router
    ScreenTrackingService,
    UserTrackingService,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    provideDatabase(() => getDatabase()),
    providePrimeNG({
      theme: {
        preset: MyPreset,  options: { darkModeSelector: '.app-light' }
      },
      // zIndex: {
      //   modal: 1100,    // dialog, sidebar
      //   overlay: 1000,  // dropdown, overlaypanel
      //   menu: 1000,     // overlay menus
      //   tooltip: 1100   // tooltip
      // },
      // ripple: true
    }),
    provideStorage(() => getStorage()), provideFirebaseApp(() => initializeApp({ projectId: "nyokjar2", appId: "1:199554869322:web:4f7bbbd25d101195bc5eb3", storageBucket: "nyokjar2.firebasestorage.app", apiKey: "AIzaSyAIHYNQJZqYbR8arv5_WqKE99SW-NYqq3A", authDomain: "nyokjar2.firebaseapp.com", messagingSenderId: "199554869322", measurementId: "G-QKZGRC6MQV" })), provideFirestore(() => getFirestore()),




  ]
};
