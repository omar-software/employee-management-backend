import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Employee } from '../../services/employee';

@Component({
  selector: 'app-employees',
  imports: [FormsModule],
  templateUrl: './employees.html',
  styleUrl: './employees.css',
})
export class Employees {
  // Mitarbeiterliste kommt von app.ts
  @Input() employees: Employee[] = [];

  // Erfolgsmeldung kommt von app.ts
  @Input() message = '';

  // Fehlermeldung kommt von app.ts
  @Input() errorMessage = '';

  // Events werden an app.ts gesendet
  @Output() refreshClicked = new EventEmitter<void>();
  @Output() editClicked = new EventEmitter<Employee>();
  @Output() deleteClicked = new EventEmitter<number>();

  // Suchtext für die Tabelle
  searchText = '';

  // Aktuelle Seite
  currentPage = 1;

  // Anzahl der Mitarbeiter pro Seite
  pageSize = 5;

  onRefresh() {
    this.currentPage = 1;
    this.refreshClicked.emit();
  }

  onEdit(employee: Employee) {
    this.editClicked.emit(employee);
  }

  onDelete(id: number) {
    this.deleteClicked.emit(id);
  }

  onSearchChange() {
    this.currentPage = 1;
  }

  get filteredEmployees(): Employee[] {
    const search = this.searchText.toLowerCase().trim();

    if (!search) {
      return this.employees;
    }

    return this.employees.filter(employee =>
      employee.firstName.toLowerCase().includes(search) ||
      employee.lastName.toLowerCase().includes(search) ||
      employee.email.toLowerCase().includes(search)
    );
  }

  get paginatedEmployees(): Employee[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;

    return this.filteredEmployees.slice(startIndex, endIndex);
  }

  get totalPages(): number {
    const pages = Math.ceil(this.filteredEmployees.length / this.pageSize);
    return pages === 0 ? 1 : pages;
  }

  get totalEmployees(): number {
    return this.employees.length;
  }

  get searchResultsCount(): number {
    return this.filteredEmployees.length;
  }

  get lastEmployeeName(): string {
    if (this.employees.length === 0) {
      return 'No employee';
    }

    const lastEmployee = this.employees[this.employees.length - 1];
    return `${lastEmployee.firstName} ${lastEmployee.lastName}`;
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }
}