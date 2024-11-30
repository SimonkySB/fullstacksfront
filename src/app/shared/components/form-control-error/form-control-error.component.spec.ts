import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormControlErrorComponent } from './form-control-error.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

describe('FormControlErrorComponent', () => {
  let component: FormControlErrorComponent;
  let fixture: ComponentFixture<FormControlErrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormControlErrorComponent, ReactiveFormsModule]
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
});
