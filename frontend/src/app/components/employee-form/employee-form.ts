import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CreateEmployeeRequest } from '../../services/employee';

@Component({
  selector: 'app-employee-form',
  imports: [FormsModule],
  templateUrl: './employee-form.html',
  styleUrl: './employee-form.css',
})
export class EmployeeForm {
  // Daten vom Formular kommen von app.ts
  @Input() employee: CreateEmployeeRequest = {
    firstName: '',
    lastName: '',
    email: ''
  };

  // Wenn diese ID null ist, sind wir im Add-Modus
  // Wenn sie eine Zahl hat, sind wir im Edit-Modus
  @Input() editingEmployeeId: number | null = null;

  // Erfolgsmeldung von app.ts
  @Input() message = '';

  // Fehlermeldung von app.ts
  @Input() errorMessage = '';

  // Events an app.ts
  @Output() cancelClicked = new EventEmitter<void>();
  @Output() saveClicked = new EventEmitter<void>();

  onCancel() {
    this.cancelClicked.emit();
  }

  onSave() {
    this.saveClicked.emit();
  }
}