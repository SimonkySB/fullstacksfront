import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { LoaderComponent } from './loader.component';
import { LoaderService } from '../services/loader.service';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';

describe('LoaderComponent', () => {
  let component: LoaderComponent;
  let fixture: ComponentFixture<LoaderComponent>;
  let loaderService: LoaderService;

  beforeEach(async () => {
    loaderService = jasmine.createSpyObj('LoaderService', ['show', 'hide']);
    

    await TestBed.configureTestingModule({
      imports: [LoaderComponent],
      providers: [LoaderService]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LoaderComponent);
    component = fixture.componentInstance;
    loaderService = TestBed.inject(LoaderService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not show the loader initially', () => {
    const loaderElement = fixture.debugElement.query(By.css('.loader-container'));
    expect(loaderElement).toBeFalsy();
  });

  it('should show the loader when show() is called', () => {
    
    loaderService.show();
    fixture.detectChanges();

    const loaderElement = fixture.debugElement.query(By.css('.loader-container'));

    expect(loaderElement).toBeTruthy();
    expect(loaderElement.classes['show']).toBeTrue();
  });

  it('should hide the loader when hide() is called', () => {

    loaderService.show();
    fixture.detectChanges();

    loaderService.hide();
    fixture.detectChanges();

    const loaderElement = fixture.debugElement.query(By.css('.loader-container'));
    expect(loaderElement).toBeFalsy();
  });
});
