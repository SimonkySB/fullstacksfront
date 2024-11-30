import { TestBed } from '@angular/core/testing';

import { ToastConfig, ToastService } from './toast.service';

describe('ToastService', () => {
  let service: ToastService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToastService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should update the toast signal when show() is called', () => {
    const toastConfig: ToastConfig = {
      message: 'This is a success message!',
      type: 'success',
    };

    service.show(toastConfig);
    const res = service.toast()
    expect(res).toEqual(toastConfig);
  });

  it('should set toast to null when close() is called', () => {
    const toastConfig: ToastConfig = {
      message: 'This is a danger message!',
      type: 'danger',
    };

    service.show(toastConfig);
    service.close();

    const res = service.toast()
    expect(res).toBeNull();
  });


});
