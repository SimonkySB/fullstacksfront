import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { PAGINAS } from '../shared/paginas.const';




export function rolGuard(rol: string): CanActivateFn {
  return (route, state) => {
    const authService = inject(AuthService)
    const router = inject(Router)

    if(authService.hasRole(rol)) {
      return true
    }
    
    router.navigate([PAGINAS.HOME])
    return false
  };  
}