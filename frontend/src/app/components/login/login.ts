import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoginRequest } from '../../services/auth';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  // Fehlermeldung kommt von app.ts
  @Input() errorMessage = '';

  // Daten aus dem Login-Formular
  loginRequest: LoginRequest = {
    username: '',
    password: ''
  };

  // Sendet Username und Passwort an app.ts
  @Output() loginClicked = new EventEmitter<LoginRequest>();

  onLogin() {
    this.loginClicked.emit(this.loginRequest);
  }
}