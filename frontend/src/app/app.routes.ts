import { Routes } from '@angular/router';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  {
    path: 'login',
    children: []
  },

  {
    path: 'employees/new',
    canActivate: [authGuard],
    children: []
  },

  {
    path: 'employees/edit/:id',
    canActivate: [authGuard],
    children: []
  },

  {
    path: 'employees',
    canActivate: [authGuard],
    children: []
  },

  {
    path: '**',
    redirectTo: 'login'
  }
];