import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

import { CreateEmployeeRequest, Employee, EmployeeService } from './services/employee';
import { AuthService, LoginRequest } from './services/auth';

import { Navbar } from './components/navbar/navbar';
import { Login } from './components/login/login';
import { Employees } from './components/employees/employees';
import { EmployeeForm } from './components/employee-form/employee-form';

@Component({
  selector: 'app-root',
  imports: [FormsModule, Navbar, Login, Employees, EmployeeForm],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  employees: Employee[] = [];

  isLoggedIn = false;
  loggedInUsername = '';

  currentPage: 'employees' | 'addEmployee' = 'employees';

  editingEmployeeId: number | null = null;

  message = '';
  errorMessage = '';
  searchText = '';

  newEmployee: CreateEmployeeRequest = {
    firstName: '',
    lastName: '',
    email: ''
  };

  constructor(
    private employeeService: EmployeeService,
    private authService: AuthService,
    private changeDetectorRef: ChangeDetectorRef,
    private router: Router // Wird für die Navigation zwischen Angular-Seiten benutzt
  ) {}

// Wird beim Start der Angular App ausgeführt
ngOnInit() {
  this.isLoggedIn = this.authService.isLoggedIn();
  this.loggedInUsername = this.authService.getUsername() || '';

  // Liest den echten Browser-Pfad, auch nach Refresh oder manueller URL-Eingabe
  const currentPath = window.location.pathname;

  if (this.isLoggedIn) {
    this.loadEmployees();

    // Wenn der Benutzer auf / oder /login ist, geht er zur Mitarbeiterliste
    if (currentPath === '/' || currentPath === '/login') {
      this.router.navigate(['/employees']);
      this.currentPage = 'employees';
    } else {
      // Wenn der Benutzer direkt /employees/new oder /employees/edit/:id öffnet
      this.syncPageWithUrl(currentPath);
    }
  } else {
    // Wenn der Benutzer nicht eingeloggt ist, darf er nur /login sehen
    this.router.navigate(['/login']);
  }

  // Reagiert auf jede spätere Änderung der URL
  this.router.events
    .pipe(filter(event => event instanceof NavigationEnd))
    .subscribe(event => {
      const navigationEnd = event as NavigationEnd;

      // Aktualisiert currentPage abhängig von der aktuellen Route
      this.syncPageWithUrl(navigationEnd.urlAfterRedirects);
    });
}

// Synchronisiert currentPage mit der URL
syncPageWithUrl(url: string) {
  if (url.startsWith('/employees/new')) {
    this.currentPage = 'addEmployee';
    this.editingEmployeeId = null;
    this.resetForm();
    this.clearMessages();
    this.changeDetectorRef.detectChanges();
    return;
  }

  if (url.startsWith('/employees/edit')) {
    this.currentPage = 'addEmployee';
    this.changeDetectorRef.detectChanges();
    return;
  }

  if (url.startsWith('/employees')) {
    this.currentPage = 'employees';
    this.changeDetectorRef.detectChanges();
    return;
  }

  this.currentPage = 'employees';
  this.changeDetectorRef.detectChanges();
}

  // Echter Login über Spring Boot API
  login(loginRequest: LoginRequest) {
    this.clearMessages();

    if (!loginRequest.username || !loginRequest.password) {
      this.errorMessage = 'Please enter username and password';
      this.changeDetectorRef.detectChanges();
      return;
    }

    this.authService.login(loginRequest).subscribe({
      next: response => {
        this.authService.saveLogin(response.username);

        this.isLoggedIn = true;
        this.loggedInUsername = response.username;
        this.currentPage = 'employees';

        // Navigiert nach erfolgreichem Login zur Mitarbeiterliste
        this.router.navigate(['/employees']);

        this.message = '';
        this.loadEmployees();
        this.changeDetectorRef.detectChanges();
      },
      error: () => {
        this.authService.logout();

        this.isLoggedIn = false;
        this.loggedInUsername = '';
        this.errorMessage = 'Invalid username or password';

        // Bleibt bei falschem Login auf der Login-Seite
        this.router.navigate(['/login']);

        this.changeDetectorRef.detectChanges();
      }
    });
  }

  // Logout und Zurücksetzen der Daten
  logout() {
    this.authService.logout();

    this.isLoggedIn = false;
    this.loggedInUsername = '';
    this.currentPage = 'employees';
    this.employees = [];
    this.editingEmployeeId = null;
    this.searchText = '';

    this.resetForm();
    this.clearMessages();

    // Navigiert nach dem Logout zurück zur Login-Seite
    this.router.navigate(['/login']);

    this.changeDetectorRef.detectChanges();
  }

  // Zeigt die Mitarbeiterliste
  showEmployees() {
    if (!this.isLoggedIn) {
      return;
    }

    this.currentPage = 'employees';
    this.editingEmployeeId = null;
    this.resetForm();
    this.clearMessages();

    // Navigiert zur Mitarbeiterliste
    this.router.navigate(['/employees']);

    this.loadEmployees();
  }

  // Zeigt das Formular zum Hinzufügen
  showAddEmployee() {
    if (!this.isLoggedIn) {
      return;
    }

    this.currentPage = 'addEmployee';
    this.editingEmployeeId = null;
    this.resetForm();
    this.clearMessages();

    // Navigiert zur Seite zum Hinzufügen eines Mitarbeiters
    this.router.navigate(['/employees/new']);

    this.changeDetectorRef.detectChanges();
  }

  // Holt Mitarbeiter vom Spring Boot Backend
  loadEmployees() {
    if (!this.isLoggedIn) {
      return;
    }

    this.employeeService.getEmployees().subscribe({
      next: data => {
        this.employees = data;
        this.changeDetectorRef.detectChanges();
      },
      error: () => {
        this.errorMessage = 'Failed to load employees';
        this.changeDetectorRef.detectChanges();
      }
    });
  }

  // Prüft, ob die Formulardaten gültig sind
  validateEmployeeForm(): boolean {
    this.clearMessages();

    const firstName = this.newEmployee.firstName.trim();
    const lastName = this.newEmployee.lastName.trim();
    const email = this.newEmployee.email.trim().toLowerCase();

    if (!firstName || !lastName || !email) {
      this.errorMessage = 'Please fill all fields';
      this.changeDetectorRef.detectChanges();
      return false;
    }

    if (firstName.length < 2) {
      this.errorMessage = 'First name must be at least 2 characters';
      this.changeDetectorRef.detectChanges();
      return false;
    }

    if (lastName.length < 2) {
      this.errorMessage = 'Last name must be at least 2 characters';
      this.changeDetectorRef.detectChanges();
      return false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
      this.errorMessage = 'Please enter a valid email address';
      this.changeDetectorRef.detectChanges();
      return false;
    }

    const emailAlreadyExists = this.employees.some(employee =>
      employee.email.toLowerCase() === email &&
      employee.id !== this.editingEmployeeId
    );

    if (emailAlreadyExists) {
      this.errorMessage = 'Employee with this email already exists';
      this.changeDetectorRef.detectChanges();
      return false;
    }

    this.newEmployee = {
      firstName,
      lastName,
      email
    };

    return true;
  }

  // Gibt eine verständliche Fehlermeldung vom Backend zurück
  getBackendErrorMessage(error: any, fallbackMessage: string): string {
    if (error?.error?.message) {
      return error.error.message;
    }

    if (error?.error?.messages) {
      return Object.values(error.error.messages).join(', ');
    }

    return fallbackMessage;
  }

  // Fügt einen neuen Mitarbeiter hinzu
  addEmployee() {
    if (!this.validateEmployeeForm()) {
      return;
    }

    this.employeeService.createEmployee(this.newEmployee).subscribe({
      next: () => {
        this.resetForm();
        this.currentPage = 'employees';
        this.message = 'Employee added successfully';

        // Navigiert nach dem Speichern zurück zur Mitarbeiterliste
        this.router.navigate(['/employees']);

        this.loadEmployees();
      },
      error: error => {
        this.errorMessage = this.getBackendErrorMessage(
          error,
          'Failed to add employee'
        );
        this.changeDetectorRef.detectChanges();
      }
    });
  }

  // Startet den Bearbeitungsmodus für einen Mitarbeiter
  startEditEmployee(employee: Employee) {
    if (!this.isLoggedIn) {
      return;
    }

    this.clearMessages();

    this.editingEmployeeId = employee.id;
    this.currentPage = 'addEmployee';

    this.newEmployee = {
      firstName: employee.firstName,
      lastName: employee.lastName,
      email: employee.email
    };

    // Navigiert zur Bearbeitungsseite des ausgewählten Mitarbeiters
    this.router.navigate(['/employees/edit', employee.id]);

    this.changeDetectorRef.detectChanges();
  }

  // Aktualisiert einen Mitarbeiter
  updateEmployee() {
    if (this.editingEmployeeId === null) {
      this.errorMessage = 'No employee selected for update';
      this.changeDetectorRef.detectChanges();
      return;
    }

    if (!this.validateEmployeeForm()) {
      return;
    }

    this.employeeService.updateEmployee(this.editingEmployeeId, this.newEmployee).subscribe({
      next: () => {
        this.editingEmployeeId = null;
        this.resetForm();
        this.currentPage = 'employees';
        this.message = 'Employee updated successfully';

        // Navigiert nach dem Aktualisieren zurück zur Mitarbeiterliste
        this.router.navigate(['/employees']);

        this.loadEmployees();
      },
      error: error => {
        this.errorMessage = this.getBackendErrorMessage(
          error,
          'Failed to update employee'
        );
        this.changeDetectorRef.detectChanges();
      }
    });
  }

  // Löscht einen Mitarbeiter
  deleteEmployee(id: number) {
    if (!this.isLoggedIn) {
      return;
    }

    this.clearMessages();

    const confirmed = confirm('Are you sure you want to delete this employee?');

    if (!confirmed) {
      return;
    }

    this.employeeService.deleteEmployee(id).subscribe({
      next: () => {
        this.message = 'Employee deleted successfully';
        this.loadEmployees();
      },
      error: () => {
        this.errorMessage = 'Failed to delete employee';
        this.changeDetectorRef.detectChanges();
      }
    });
  }

  // Entscheidet, ob ein Mitarbeiter erstellt oder aktualisiert wird
  saveEmployee() {
    if (this.editingEmployeeId === null) {
      this.addEmployee();
    } else {
      this.updateEmployee();
    }
  }

  // Setzt das Formular zurück
  resetForm() {
    this.newEmployee = {
      firstName: '',
      lastName: '',
      email: ''
    };
  }

  // Löscht alle Meldungen
  clearMessages() {
    this.message = '';
    this.errorMessage = '';
  }
}