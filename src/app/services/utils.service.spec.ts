import { TestBed } from '@angular/core/testing';
import { UtilService } from './utils.service';
import { LoaderService } from '../shared/services/loader.service';
import { ToastConfig, ToastService } from '../shared/services/toast.service';
import { FormBuilder, FormControl } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';


describe('UtilService', () => {
  let service: UtilService;
  let loaderServiceSpy: jasmine.SpyObj<LoaderService>;
  let toastServiceSpy: jasmine.SpyObj<ToastService>;


  beforeEach(() => {
    loaderServiceSpy = jasmine.createSpyObj('LoaderService', ['show', 'hide']);
    toastServiceSpy = jasmine.createSpyObj('ToastService', ['show', 'close']);

    TestBed.configureTestingModule({
      providers: [
        UtilService,
        { provide: LoaderService, useValue: loaderServiceSpy },
        { provide: ToastService, useValue: toastServiceSpy },
      ]
    });

    service = TestBed.inject(UtilService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should trim control value', () => {
    const fb = new FormBuilder();
    
    const formControl = fb.nonNullable.control<string>("  some value  ")

    service.trimControlValue(formControl);

    expect(formControl.value).toBe('some value');
  });

  it('should trim all control values in the form', () => {
    const fb = new FormBuilder();

    const form = fb.nonNullable.group({
      control1: fb.nonNullable.control<string>('  value 1  '),
      control2: fb.nonNullable.control<string>('  value 2  '),
    });

    service.trimControlsValues(form);
    expect(form.controls.control1.value).toBe('value 1');
    expect(form.controls.control2.value).toBe('value 2');
  });

  it('should call loader.show() when loaderShow() is called', () => {
    service.loaderShow();
    expect(loaderServiceSpy.show).toHaveBeenCalled();
  });

  it('should call loader.hide() when loaderHide() is called', () => {
    service.loaderHide();
    expect(loaderServiceSpy.hide).toHaveBeenCalled();
  });

  it('should call toast.show() when toastShow() is called', () => {
    const cfg: ToastConfig = { message: 'Test Toast', type: 'success' };
    service.toastShow(cfg);
    expect(toastServiceSpy.show).toHaveBeenCalledWith(cfg);
  });

  it('should call toast.close() when toastClose() is called', () => {
    service.toastClose();
    expect(toastServiceSpy.close).toHaveBeenCalled();
  });

  it('should handle 422 error and show toast with error message', () => {
    const errorResponse = new HttpErrorResponse({
      status: 422,
      error: { message: 'Validation error' },
    });

    service.handleError(errorResponse);

    expect(toastServiceSpy.show).toHaveBeenCalledWith({
      message: '{"message":"Validation error"}',
      type: 'danger'
    });
  });

  it('should handle other errors and show toast with error message', () => {
    const errorResponse = new HttpErrorResponse({
      status: 500,
      error: 'Server error',
    });

    service.handleError(errorResponse);

    expect(toastServiceSpy.show).toHaveBeenCalledWith({
      message: 'Server error',
      type: 'danger'
    });
  });

});
