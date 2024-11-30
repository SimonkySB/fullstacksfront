import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { authGuard } from './auth.guard';
import { AuthService } from '../services/auth.service';
import { PAGINAS } from '../shared/paginas.const';



describe('authGuard', () => {
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let routerSpy: jasmine.SpyObj<Router>;

  const mockRoute = {} as ActivatedRouteSnapshot;
  const mockState = {} as RouterStateSnapshot;
  
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => authGuard(...guardParameters));

  beforeEach(() => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['isAuthenticated']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy },
      ]
    });
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });

  it('should allow activation when user is authenticated', () => {
    authServiceSpy.isAuthenticated.and.returnValue(true);

    const result = executeGuard(mockRoute, mockState);

    expect(authServiceSpy.isAuthenticated).toHaveBeenCalled();
    expect(result).toBeTrue();
  });

  it('should deny activation and navigate to login when user is not authenticated', () => {
    authServiceSpy.isAuthenticated.and.returnValue(false);

    const result = executeGuard(mockRoute, mockState);

    expect(authServiceSpy.isAuthenticated).toHaveBeenCalled();
    expect(routerSpy.navigate).toHaveBeenCalledWith(
      [PAGINAS.LOGIN],
      { replaceUrl: true }
    );
    expect(result).toBeFalse();
  });
});
