import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductosListComponent } from './productos-list.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ProductosListComponent', () => {
  let component: ProductosListComponent;
  let fixture: ComponentFixture<ProductosListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductosListComponent, HttpClientTestingModule]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductosListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
