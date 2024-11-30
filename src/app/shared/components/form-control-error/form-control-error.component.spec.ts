import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormControlErrorComponent } from './form-control-error.component';
import { FormControl, Validators } from '@angular/forms';
import { By } from '@angular/platform-browser';

describe('FormControlErrorComponent', () => {
  let component: FormControlErrorComponent;
  let fixture: ComponentFixture<FormControlErrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormControlErrorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormControlErrorComponent);
    component = fixture.componentInstance;
    const control = new FormControl('');
    component.control = control;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display required error message when control is required and touched', () => {
    
    const control = new FormControl('', [Validators.required]);
    component.control = control;

    
    control.markAsTouched();
    fixture.detectChanges();

    
    const errorElement = fixture.debugElement.query(By.css('.fce-error'));
    expect(errorElement).toBeTruthy();
    expect(errorElement.nativeElement.textContent).toContain('El campo es requerido.');
  });

  it('should display min error message when control value is too small', () => {
    
    const control = new FormControl(4, [Validators.min(5)]);
    component.control = control;

    
    control.markAsTouched();
    fixture.detectChanges();

    
    const errorElement = fixture.debugElement.query(By.css('.fce-error'));
    expect(errorElement).toBeTruthy();
    expect(errorElement.nativeElement.textContent).toContain('El valor debe ser mayor o igual a 5');
  });

  it('should display max error message when control value is too large', () => {
    
    const control = new FormControl(11, [Validators.max(10)]);
    component.control = control;

    
    control.markAsTouched();
    fixture.detectChanges();

    const errorElement = fixture.debugElement.query(By.css('.fce-error'));
    expect(errorElement).toBeTruthy();
    expect(errorElement.nativeElement.textContent).toContain('El valor debe ser menor o igual a 10');
  });
  it('should display email error message when control value is not a valid email', () => {
    
    const control = new FormControl('invalidEmail', [Validators.email]);
    component.control = control;

    
    control.markAsTouched();
    fixture.detectChanges();

    
    const errorElement = fixture.debugElement.query(By.css('.fce-error'));
    expect(errorElement).toBeTruthy();
    expect(errorElement.nativeElement.textContent).toContain('El email no es válido.');
  });

  it('should display minlength error message when control value is too short', () => {
    
    const control = new FormControl('abc', [Validators.minLength(5)]);
    component.control = control;

    
    control.markAsTouched();
    fixture.detectChanges();

  
    const errorElement = fixture.debugElement.query(By.css('.fce-error'));
    expect(errorElement).toBeTruthy();
    expect(errorElement.nativeElement.textContent).toContain('El campo debe tener como mínimo 5 caracteres de largo.');
  });

  it('should display maxlength error message when control value is too long', () => {
    
    const control = new FormControl('tooLongString', [Validators.maxLength(5)]);
    component.control = control;

    
    control.markAsTouched();
    fixture.detectChanges();

    
    const errorElement = fixture.debugElement.query(By.css('.fce-error'));
    expect(errorElement).toBeTruthy();
    expect(errorElement.nativeElement.textContent).toContain('El campo debe tener como máximo 5 caracteres de largo.');
  });

  it('should not display error message when control is untouched and dirty', () => {
    
    const control = new FormControl('', [Validators.required]);
    component.control = control;

    
    fixture.detectChanges();

    
    const errorElement = fixture.debugElement.query(By.css('.fce-error'));
    expect(errorElement).toBeFalsy();
  });
});
