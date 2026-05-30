import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  // Gibt an, ob der Benutzer eingeloggt ist
  @Input() isLoggedIn = false;

  // Benutzername vom eingeloggten Benutzer
  @Input() username = '';

  // Events, die Navbar an app.ts sendet
  @Output() loginClicked = new EventEmitter<void>();
  @Output() logoutClicked = new EventEmitter<void>();
  @Output() employeesClicked = new EventEmitter<void>();
  @Output() addEmployeeClicked = new EventEmitter<void>();

  onLogin() {
    this.loginClicked.emit();
  }

  onLogout() {
    this.logoutClicked.emit();
  }

  onEmployees() {
    this.employeesClicked.emit();
  }

  onAddEmployee() {
    this.addEmployeeClicked.emit();
  }
}