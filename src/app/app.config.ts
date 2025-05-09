import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideFirebaseApp(() => initializeApp({ projectId: "dbclientefractal", appId: "1:246466666690:web:4fdb58cfb49922cc8b9b5b", storageBucket: "dbclientefractal.firebasestorage.app", apiKey: "AIzaSyAYLXP4Zp1Zw6G17XNbksmWa4RKBH9xymw", authDomain: "dbclientefractal.firebaseapp.com", messagingSenderId: "246466666690" })), provideAuth(() => getAuth()), provideFirestore(() => getFirestore())]
};
