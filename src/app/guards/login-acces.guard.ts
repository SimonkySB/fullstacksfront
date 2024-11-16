import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { PAGINAS } from '../shared/paginas.const';

export const loginAccesGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService)
  const router = inject(Router)
  
  if(authService.isAuthenticated()) {
    router.navigate([PAGINAS.PRODUCTOS], {replaceUrl: true})
    return false;
  }

  
  return true;
};
