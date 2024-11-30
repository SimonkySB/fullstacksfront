import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductosFormComponent } from './productos-form.component';
import { ProductoService } from '../../services/producto.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable, of, } from 'rxjs';
import { UtilService } from '../../services/utils.service';
import { Location } from '@angular/common';


describe('ProductosFormComponent', () => {
  let component: ProductosFormComponent;
  let fixture: ComponentFixture<ProductosFormComponent>;
  let productoService: jasmine.SpyObj<ProductoService>;
  let utilService: jasmine.SpyObj<UtilService>;
  let location: jasmine.SpyObj<Location>;

  
  const mockProducto = {
    id: 123,
    nombre: 'Producto de prueba',
    precio: 100,
    categoria: 'Categoría de prueba'
  };

  beforeEach(async () => {
    const productoServiceSpy = jasmine.createSpyObj('ProductoService', ['create', 'edit', 'getById']);
    const utilServiceSpy = jasmine.createSpyObj('UtilService', ['loaderShow', 'loaderHide', 'toastShow', 'handleError', 'trimControlValue']);
    const locationSpy = jasmine.createSpyObj('Location', ['back']);

    const mockActivatedRoute = {
      snapshot: {
        paramMap: {
          get: (key: string) => key === 'id' ? '123' : null
        }
      }
    };

    productoServiceSpy.getById.and.returnValue(of(mockProducto)); 

    await TestBed.configureTestingModule({
      imports: [ProductosFormComponent, HttpClientTestingModule],
      providers: [
        { provide: ProductoService, useValue: productoServiceSpy },
        { provide: UtilService, useValue: utilServiceSpy },
        { provide: Location, useValue: locationSpy },
        {
          provide: ActivatedRoute,
          useValue: mockActivatedRoute
        }
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductosFormComponent);
    component = fixture.componentInstance;

    productoService = TestBed.inject(ProductoService) as jasmine.SpyObj<ProductoService>;
    utilService = TestBed.inject(UtilService) as jasmine.SpyObj<UtilService>;
    location = TestBed.inject(Location) as jasmine.SpyObj<Location>;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load product on init', () => {
    expect(productoService.getById).toHaveBeenCalledWith(123);

    expect(component.form.value).toEqual({
      id: mockProducto.id,
      nombre: mockProducto.nombre,
      precio: mockProducto.precio,
      categoria: mockProducto.categoria
    });
  });

  it('should call create when form is valid and id is 0', () => {
    component.form.patchValue({
      id: 0,
      nombre: 'Nuevo Producto',
      precio: 10,
      categoria: 'Categoría Nueva'
    });
    productoService.create.and.returnValue(of({}));
    component.submit();
  
    expect(productoService.create).toHaveBeenCalledWith({
      nombre: 'Nuevo Producto',
      precio: 10,
      categoria: 'Categoría Nueva'
    });
    expect(utilService.toastShow).toHaveBeenCalledWith({message: 'Producto registrado exitosamente', type: 'success'});
  });

  it('should call edit when form is valid and id is not 0', () => {
    component.form.patchValue({
      id: 123,
      nombre: 'Producto Editado',
      precio: 15,
      categoria: 'Categoría Editada'
    });
  
    productoService.edit.and.returnValue(of({}));

    component.submit();
  
    expect(productoService.edit).toHaveBeenCalledWith({
      id: 123,
      nombre: 'Producto Editado',
      precio: 15,
      categoria: 'Categoría Editada'
    });
    expect(utilService.toastShow).toHaveBeenCalledWith({message: 'Producto actualizado exitosamente', type: 'success'});
  });
  
});
