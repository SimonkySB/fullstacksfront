import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';

import { rolGuard } from './rol.guard';
import { AuthService } from '../services/auth.service';
import { ROLES } from '../shared/roles.const';
import { PAGINAS } from '../shared/paginas.const';

describe('rolGuard', () => {
  
  let authService: jasmine.SpyObj<AuthService>;
  let router: jasmine.SpyObj<Router>;
  const mockRoute = {} as ActivatedRouteSnapshot;
  const mockState = {} as RouterStateSnapshot;

  const executeGuard: CanActivateFn = (...guardParameters) => 
    TestBed.runInInjectionContext(() => rolGuard(ROLES.ADMIN)(...guardParameters));

  beforeEach(() => {
    authService = jasmine.createSpyObj('AuthService', ['hasRole']);
    router = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [
        { provide: AuthService, useValue: authService },
        { provide: Router, useValue: router },
      ]
    });
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });

  it('should allow navigation if the user has the required role', () => {
    authService.hasRole.and.returnValue(true);
    const result = executeGuard(mockRoute, mockState);
    expect(result).toBeTrue();
  });

  it('should block navigation and redirect if the user does not have the required role', () => {
    
    authService.hasRole.and.returnValue(false);

    const result = executeGuard(mockRoute, mockState);
    expect(result).toBeFalse();
    expect(router.navigate).toHaveBeenCalledWith([PAGINAS.HOME]);
  });
  
});
