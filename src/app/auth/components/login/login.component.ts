import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

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

  onSubmit(): void {
    console.log('Login submitted:', this.loginData);
    // Here you would typically call an authentication service
  }
}
