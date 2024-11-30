import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductosListComponent } from './productos-list.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ProductoService } from '../../services/producto.service';
import { UtilService } from '../../services/utils.service';
import { of } from 'rxjs';
import { PAGINAS } from '../../shared/paginas.const';

describe('ProductosListComponent', () => {
  let component: ProductosListComponent;
  let fixture: ComponentFixture<ProductosListComponent>;
  let productoService: jasmine.SpyObj<ProductoService>;
  let router: jasmine.SpyObj<Router>;
  let authService: jasmine.SpyObj<AuthService>;
  let utilsService: jasmine.SpyObj<UtilService>;

  beforeEach(async () => {
    const productoServiceSpy = jasmine.createSpyObj('ProductoService', ['list', 'delete']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['logout']);
    const utilsServiceSpy = jasmine.createSpyObj('UtilService', ['loaderShow', 'loaderHide', 'toastShow', 'handleError']);

    await TestBed.configureTestingModule({
      imports: [ProductosListComponent, HttpClientTestingModule],
      providers: [
        { provide: ProductoService, useValue: productoServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: AuthService, useValue: authServiceSpy },
        { provide: UtilService, useValue: utilsServiceSpy }
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductosListComponent);
    component = fixture.componentInstance;

    productoService = TestBed.inject(ProductoService) as jasmine.SpyObj<ProductoService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    utilsService = TestBed.inject(UtilService) as jasmine.SpyObj<UtilService>;
    
    productoService.list.and.returnValue(of([{ id: 1, nombre: 'Producto 1', precio: 100, categoria: 'Categoria 1' }]));
    productoService.delete.and.returnValue(of({}));


    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call load() on ngOnInit', () => {
    spyOn(component, 'load').and.callThrough();
    component.ngOnInit();
    expect(component.load).toHaveBeenCalled();
  });

  it('should call create() and navigate to productos crear', () => {
    component.create();
    expect(router.navigate).toHaveBeenCalledWith([PAGINAS.PRODUCTOS_CREAR]);
  });

  it('should call edit() and navigate to productos edit', () => {
    const id = 1;
    component.edit(id);
    expect(router.navigate).toHaveBeenCalledWith([PAGINAS.PRODUCTOS_EDIT, id]);
  });

  it('should call delete() and show success toast', () => {
    spyOn(window, 'confirm').and.returnValue(true);
    spyOn(component, 'load').and.callThrough();
    component.delete(1);

    expect(utilsService.loaderShow).toHaveBeenCalled();
    expect(productoService.delete).toHaveBeenCalledWith(1);
    expect(utilsService.loaderHide).toHaveBeenCalled();
    expect(utilsService.toastShow).toHaveBeenCalledWith({ message: "Producto eliminado exitosamente", type: "success" });
  });

  it('should call load() after delete() is successful', () => {
    spyOn(window, 'confirm').and.returnValue(true);
    spyOn(component, 'load').and.callThrough();
    component.delete(1);
    expect(component.load).toHaveBeenCalled();
  });


  it('should call logout()', () => {
    component.logout();
    expect(authService.logout).toHaveBeenCalled();
  });
  

});
