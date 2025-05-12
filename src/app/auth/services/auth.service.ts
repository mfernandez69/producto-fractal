import { inject, Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  UserCredential,
  signOut
} from '@angular/fire/auth';
import { FirebaseError } from 'firebase/app';

export interface LoginData {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _auth = inject(Auth);
    isAuthenticated$: any;

  // Register a new user with email and password
  async signUp(email: string, password: string): Promise<UserCredential> {
    try {
      return await createUserWithEmailAndPassword(
        this._auth,
        email,
        password
      );
    } catch (error) {
      console.error('Error in signUp:', error);
      throw error;
    }
  }

  // Login with email and password
  async signIn({ email, password }: LoginData): Promise<UserCredential> {
    try {
      return await signInWithEmailAndPassword(this._auth, email, password);
    } catch (error) {
      console.error('Error in signIn:', error);
      if (error instanceof FirebaseError) {
        throw error;
      }
      throw new Error('Unknown authentication error');
    }
  }

  // Login with Google
  signInWithGoogle(): Promise<UserCredential> {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(this._auth, provider);
  }

  // Logout
  signOut(): Promise<void> {
    return signOut(this._auth);
  }

  // Get current user
  get currentUser() {
    return this._auth.currentUser;
  }
}
