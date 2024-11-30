import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToastComponent } from './toast.component';
import { ToastService } from '../../services/toast.service';
import { By } from '@angular/platform-browser';

describe('ToastComponent', () => {
  let component: ToastComponent;
  let fixture: ComponentFixture<ToastComponent>;
  let toastService: ToastService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToastComponent],
      providers: [ToastService]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ToastComponent);
    component = fixture.componentInstance;
    toastService = TestBed.inject(ToastService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not display toast initially', () => {
    
    const toastElement = fixture.debugElement.query(By.css('ngb-toast'));
    expect(toastElement).toBeFalsy(); 
  });

  it('should display a toast with the correct class and message when toast is shown', () => {
    
    toastService.show({ message: 'Success!', type: 'success' });

    fixture.detectChanges(); 

    const toastElement = fixture.debugElement.query(By.css('ngb-toast'));
    expect(toastElement).toBeTruthy();
    expect(toastElement.nativeElement.textContent).toContain('Success!'); 
    expect(toastElement.classes['bg-success']).toBeTrue();
  });

  it('should call close method when toast is hidden', () => {
    
    spyOn(toastService, 'close');

    
    toastService.show({ message: 'Test', type: 'primary' });
    fixture.detectChanges(); 

    const toastElement = fixture.debugElement.query(By.css('ngb-toast'));
    toastElement.triggerEventHandler('hidden', null);

    expect(toastService.close).toHaveBeenCalled();
  });

  it('should display a toast with the correct class for "danger" type', () => {
    
    toastService.show({ message: 'Error occurred!', type: 'danger' });

    fixture.detectChanges();

    const toastElement = fixture.debugElement.query(By.css('ngb-toast'));
    expect(toastElement).toBeTruthy();
    expect(toastElement.nativeElement.textContent).toContain('Error occurred!');
    expect(toastElement.classes['bg-danger']).toBeTrue();
  });

  it('should not show a toast when config is null', () => {
    
    toastService.close();

    fixture.detectChanges();

    const toastElement = fixture.debugElement.query(By.css('ngb-toast'));
    expect(toastElement).toBeFalsy();
  });
});
