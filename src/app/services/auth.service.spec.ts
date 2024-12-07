import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { PAGINAS } from '../shared/paginas.const';



describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    const routerSpyObj = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
      ]
    });

    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  afterEach(() => {
    httpMock.verify();
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should save token on login', () => {
    const loginRequest = { email: 'test', password: 'password' };
    const loginResponse = { token: 'mockToken' };

    spyOn(localStorage, 'setItem');

    service.login(loginRequest).subscribe((res) => {
      expect(localStorage.setItem).toHaveBeenCalledWith('accessToken', 'mockToken');
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/auth/login`);
    expect(req.request.method).toBe('POST');
    req.flush(loginResponse);
  });

  it('should make a POST request on register', () => {
    const registerRequest = { email: 'newUser', password: 'password', fullname: "minombre" };

    service.registro(registerRequest).subscribe();

    const req = httpMock.expectOne(`${environment.apiUrl}/auth/register`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(registerRequest);
    req.flush({});
  });

  it('should remove token on logout and navigate to login', () => {
    spyOn(localStorage, 'removeItem');
    spyOn(routerSpy, 'navigate');

    service.logout();

    expect(localStorage.removeItem).toHaveBeenCalledWith('accessToken');
    expect(routerSpy.navigate).toHaveBeenCalledWith([PAGINAS.LOGIN], { replaceUrl: true });
  });

  it('should return token from localStorage', () => {
    spyOn(localStorage, 'getItem').and.returnValue('mockToken');

    const token = service.getToken();

    expect(token).toBe('mockToken');
    expect(localStorage.getItem).toHaveBeenCalledWith('accessToken');
  });

  it('should return true if token exists', () => {
    spyOn(localStorage, 'getItem').and.returnValue('mockToken');

    const isAuthenticated = service.isAuthenticated();

    expect(isAuthenticated).toBeTrue();
  });

  it('should return false if token does not exist', () => {
    spyOn(localStorage, 'getItem').and.returnValue(null);

    const isAuthenticated = service.isAuthenticated();

    expect(isAuthenticated).toBeFalse();
  });

  it('should return roles from localStorage', () => {
    spyOn(localStorage, 'getItem').and.returnValue('ADMIN');

    const roles = service.getRoles();

    expect(roles).toBe('ADMIN');
    expect(localStorage.getItem).toHaveBeenCalledWith('roles');
  });

  it('should return true if role exists', () => {
    spyOn(service, 'getRoles').and.returnValue('ADMIN');

    const result = service.hasRole('ADMIN');
    expect(result).toBeTrue();
  });

  it('should return false if role do not exists', () => {
    spyOn(service, 'getRoles').and.returnValue('USER,ADMIN');

    const result = service.hasRole('MANAGER');
    expect(result).toBeFalse();
  });

});
