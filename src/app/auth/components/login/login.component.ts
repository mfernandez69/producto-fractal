import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styles: ``
})
export class LoginComponent {
  loginData = {
    email: '',
    password: ''
  };
  
  errorMessage: string = '';
  loading: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  async onSubmit(): Promise<void> {
    this.loading = true;
    this.errorMessage = '';
    
    try {
      // Call auth service to sign in
      await this.authService.signIn(this.loginData);
      console.log('Login successful');
      
      // Navigate to student page after successful login
      this.router.navigate(['/student/']);
    } catch (error) {
      // Handle login errors
      console.error('Login error:', error);
      if (error instanceof Error) {
        this.errorMessage = error.message;
      } else {
        this.errorMessage = 'An unexpected error occurred during login.';
      }
    } finally {
      this.loading = false;
    }
  }
}
