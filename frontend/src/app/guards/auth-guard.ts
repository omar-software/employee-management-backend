import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth';

export const authGuard: CanActivateFn = () => {
  // Holt den AuthService, um den Login-Status zu prüfen
  const authService = inject(AuthService);

  // Holt den Router, um bei fehlendem Login weiterzuleiten
  const router = inject(Router);

  // Prüft, ob der Benutzer eingeloggt ist
  if (authService.isLoggedIn()) {
    return true;
  }

  // Wenn der Benutzer nicht eingeloggt ist, zurück zur Login-Seite
  return router.createUrlTree(['/login']);
};