import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';


import { appRoutes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes),
    provideFirebaseApp(() =>
      initializeApp({
        projectId: "massage-7c56a",
        appId: "1:586443436113:web:0dc8e04ba2441cc496c870",
        storageBucket: "massage-7c56a.firebasestorage.app ",
        apiKey: "AIzaSyCDWywWYh8t8bfewwZs-ZRClcpvI7iBp8Y",
        authDomain: "massage-7c56a.firebaseapp.com  ",
        messagingSenderId: "586443436113"
      })
    ),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
  ]
};

