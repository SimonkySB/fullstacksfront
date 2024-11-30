import { TestBed } from '@angular/core/testing';

import { LoaderService } from './loader.service';

describe('LoaderService', () => {
  let service: LoaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should emit true when show() is called', (done) => {
    service.loading$.subscribe((loading) => {
      expect(loading).toBe(true);
      done();
    });

    service.show();
  });

  it('should emit false when hide() is called', (done) => {
    service.loading$.subscribe((loading) => {
      expect(loading).toBe(false);
      done();
    });

    service.hide();
  });

  it('should not emit the initial value again when show() is called after hide()', (done) => {
    let callCount = 0;
    
    service.loading$.subscribe((loading) => {
      if (callCount === 0) {
        expect(loading).toBe(false);
      } else if (callCount === 1) {
        expect(loading).toBe(true);
      }
      callCount++;
      
      if (callCount === 2) {
        done();
      }
    });

    service.hide();
    service.show();
  });
});
