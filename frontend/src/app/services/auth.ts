import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Daten, die Angular zum Backend sendet
export interface LoginRequest {
  username: string;
  password: string;
}

// Antwort vom Spring Boot Backend
export interface LoginResponse {
  success: boolean;
  message: string;
  username: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/auth/login';

  constructor(private http: HttpClient) {}

  // Sendet Username und Passwort an Spring Boot
  login(loginRequest: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.apiUrl, loginRequest);
  }

  // Speichert Login im Browser
  saveLogin(username: string): void {
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('username', username);
  }

  // Prüft, ob Benutzer eingeloggt ist
  isLoggedIn(): boolean {
    return localStorage.getItem('isLoggedIn') === 'true';
  }

  // Gibt Username zurück
  getUsername(): string | null {
    return localStorage.getItem('username');
  }

  // Logout
  logout(): void {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('username');
  }
}