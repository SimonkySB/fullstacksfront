import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductosFormComponent } from './productos-form.component';
import { ProductoService } from '../../services/producto.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';


describe('ProductosFormComponent', () => {
  let component: ProductosFormComponent;
  let fixture: ComponentFixture<ProductosFormComponent>;

  let mockActivatedRoute: any

  beforeEach(async () => {
    mockActivatedRoute = jasmine.createSpyObj({paramMap: new Observable()}, {params: { id: 1 }})

    await TestBed.configureTestingModule({
      imports: [ProductosFormComponent, HttpClientTestingModule],
      providers: [
        ProductoService,
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: (key: string) => {
                  if (key === 'id') return '123';
                  return null;
                },
              },
            },
          },
        }
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductosFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
