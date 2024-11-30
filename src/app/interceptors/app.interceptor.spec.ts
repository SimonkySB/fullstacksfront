import { TestBed } from '@angular/core/testing';
import { HttpClient, HttpInterceptorFn, provideHttpClient, withInterceptors } from '@angular/common/http';
import { appInterceptor } from './app.interceptor';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { AuthService } from '../services/auth.service';
import { ToastService } from '../shared/services/toast.service';
import { environment } from '../../environments/environment';




describe('appInterceptor', () => {
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let toastServiceSpy: jasmine.SpyObj<ToastService>;
  
  const interceptor: HttpInterceptorFn = (req, next) => 
    TestBed.runInInjectionContext(() => appInterceptor(req, next));

  beforeEach(() => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['getToken', 'logout']);
    toastServiceSpy = jasmine.createSpyObj('ToastService', ['show']);

    

    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptors([appInterceptor])),
        provideHttpClientTesting(),
        { provide: AuthService, useValue: authServiceSpy },
        { provide: ToastService, useValue: toastServiceSpy },
      ]
    });

    httpMock = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });

  it('should not add Authorization header if token is null', () => {
    authServiceSpy.getToken.and.returnValue(null);
  
    httpClient.get("/api/test").subscribe();
  
    const req = httpMock.expectOne("/api/test");
    expect(req.request.headers.has('Authorization')).toBeFalse();
    req.flush({});
  });

  it('should add Authorization header if URL matches apiUrl', () => {
    authServiceSpy.getToken.and.returnValue('mockToken');

    httpClient.get(environment.apiUrl).subscribe();

    const req = httpMock.expectOne(environment.apiUrl);
    expect(req.request.headers.get('Authorization')).toBe('Bearer mockToken');
    req.flush({});
  });

  it('should handle 401 or 403 errors', () => {
    authServiceSpy.getToken.and.returnValue('mockToken');

    httpClient.get("/api/test").subscribe({
      error: () => {
        expect(authServiceSpy.logout).toHaveBeenCalled();
        expect(toastServiceSpy.show).toHaveBeenCalledWith({
          type: 'danger',
          message: 'La sessión expiró',
        });
      },
    });

    const req = httpMock.expectOne("/api/test");
    req.flush('Unauthorized', { status: 401, statusText: 'Unauthorized' });
  });
});
