import { TestBed } from '@angular/core/testing';
import { ProductoService } from './producto.service';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { Producto } from '../models/Producto';
import { environment } from '../../environments/environment';

describe('ProductoService', () => {
  let productoService: ProductoService;
  let httpMock: HttpTestingController;
  const url = environment.apiUrl + "/gestion/productos/"

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
      ]
    });
    productoService = TestBed.inject(ProductoService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(productoService).toBeTruthy();
  });

  it('should get a list of productos', () => {
    const mockProductos: Producto[] = [
      { id: 1, nombre: "nombre", precio: 2000, categoria: "cat" },
      { id: 2, nombre: "nombre", precio: 2000, categoria: "cat" },
    ];

    productoService.list().subscribe((productos) => {
      expect(productos.length).toBe(2);
      expect(productos).toEqual(mockProductos);
    });

    const req = httpMock.expectOne(url);
    expect(req.request.method).toBe('GET');
    req.flush(mockProductos);
  });

  it('should get a producto by id', () => {
    const mockProducto: Producto = { id: 1, nombre: "nombre", precio: 2000, categoria: "cat" }

    productoService.getById(1).subscribe((producto) => {
      expect(producto).toEqual(mockProducto);
    });

    const req = httpMock.expectOne(url + 1);
    expect(req.request.method).toBe('GET');
    req.flush(mockProducto);
  });

  it('should create a producto', () => {
    const newProducto: Omit<Producto, 'id'> = { nombre: "nombre", precio: 2000, categoria: "cat" }
    const mockProducto: Producto = { id: 3, ...newProducto };

    productoService.create(newProducto).subscribe((producto) => {
      expect(producto).toEqual(mockProducto);
    });

    const req = httpMock.expectOne(url);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newProducto);
    req.flush(mockProducto);
  });

  it('should edit a producto', () => {
    const productoToEdit: Producto = { id: 1, nombre: "nombre", precio: 2000, categoria: "cat" }

    productoService.edit(productoToEdit).subscribe((producto) => {
      expect(producto).toEqual(productoToEdit);
    });

    const req = httpMock.expectOne(url + 1);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(productoToEdit);
    req.flush(productoToEdit);
  });

  it('should delete a producto', () => {
    const idToDelete = 1;

    productoService.delete(idToDelete).subscribe((response) => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne(url + 1);
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });
});
