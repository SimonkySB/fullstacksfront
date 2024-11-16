import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { PAGINAS } from '../shared/paginas.const';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService)
  const router = inject(Router)
  if(authService.isAuthenticated()) {
    return true;
  }

  router.navigate([PAGINAS.LOGIN], {replaceUrl: true})
  return false;
  
};
