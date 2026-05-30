import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Interface für einen Mitarbeiter, der vom Backend kommt
export interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}

// Interface für Daten, die wir beim Erstellen oder Bearbeiten senden
export interface CreateEmployeeRequest {
  firstName: string;
  lastName: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  // URL vom Spring Boot Backend
  private apiUrl = 'http://localhost:8080/api/employees';

  constructor(private http: HttpClient) {}

  // Holt alle Mitarbeiter vom Backend
  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.apiUrl);
  }

  // Erstellt einen neuen Mitarbeiter
  createEmployee(employee: CreateEmployeeRequest): Observable<Employee> {
    return this.http.post<Employee>(this.apiUrl, employee);
  }

  // Aktualisiert einen bestehenden Mitarbeiter
  updateEmployee(id: number, employee: CreateEmployeeRequest): Observable<Employee> {
    return this.http.put<Employee>(`${this.apiUrl}/${id}`, employee);
  }

  // Löscht einen Mitarbeiter anhand der ID
  deleteEmployee(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}