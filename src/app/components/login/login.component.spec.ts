import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { AuthService } from '../../services/auth.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UtilService } from '../../services/utils.service';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  let authService: jasmine.SpyObj<AuthService>;
  let utilService: jasmine.SpyObj<UtilService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    authService = jasmine.createSpyObj('AuthService', ['login']);
    utilService = jasmine.createSpyObj('UtilService', ['loaderShow', 'loaderHide', 'handleError', 'trimControlsValues']);
    router = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      providers: [
        { provide: AuthService, useValue: authService },
        { provide: UtilService, useValue: utilService },
        { provide: Router, useValue: router }
      ],
      imports: [LoginComponent, HttpClientTestingModule]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create the form with invalid initial state', () => {
    fixture.detectChanges();
    expect(component.form.valid).toBeFalse();
    expect(component.form.get('email')?.valid).toBeFalse();
    expect(component.form.get('password')?.valid).toBeFalse();
  });

  it('should mark the email field as invalid when the value is empty', () => {
    const emailControl = component.form.get('email');
    emailControl?.setValue('');
    fixture.detectChanges();
    expect(emailControl?.invalid).toBeTrue();
  });

  it('should mark the password field as invalid when the value is empty', () => {
    const passwordControl = component.form.get('password');
    passwordControl?.setValue('');
    fixture.detectChanges();
    expect(passwordControl?.invalid).toBeTrue();
  });

 
  it('should call handleError when login fails', () => {
    const values = { email: 'test@example.com', password: 'password123' };
    component.form.setValue(values);
    authService.login.and.returnValue(throwError({}));

    component.submit();
    fixture.detectChanges();

    expect(utilService.loaderShow).toHaveBeenCalled();
    expect(authService.login).toHaveBeenCalledWith({ email: values.email, password: values.password });
    expect(utilService.loaderHide).toHaveBeenCalled();
    expect(utilService.handleError).toHaveBeenCalled();
  });

  it('should call register and navigate to the register page', () => {
    component.register();
    fixture.detectChanges();
    expect(router.navigate).toHaveBeenCalledWith(['register']);
  });

 
});
