import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Producto } from '../models/Producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private http = inject(HttpClient)
  private url = environment.apiUrl + "/gestion/productos"

 
  constructor() { }

  list() {
    return this.http.get<Producto[]>(`${this.url}/`)
  }

  getById(id: number) {
    return this.http.get<Producto>(`${this.url}/${id}`)
  }


  create(producto: Omit<Producto, 'id'>) {
    return this.http.post(`${this.url}/`, producto)
  }


  edit(producto: Producto) {
    return this.http.put(`${this.url}/${producto.id}`, producto)
  }


  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`)
  }


}
