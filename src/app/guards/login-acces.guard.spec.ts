import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { loginAccesGuard } from './login-acces.guard';

describe('loginAccesGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => loginAccesGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
