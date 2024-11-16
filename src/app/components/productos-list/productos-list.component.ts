import { Component, inject, OnInit } from '@angular/core';
import { ProductoService } from '../../services/producto.service';
import { Router } from '@angular/router';
import { Producto } from '../../models/Producto';
import { finalize, tap } from 'rxjs';
import { PAGINAS } from '../../shared/paginas.const';
import { UtilService } from '../../services/utils.service';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-productos-list',
  standalone: true,
  imports: [],
  templateUrl: './productos-list.component.html',
  styleUrl: './productos-list.component.scss'
})
export class ProductosListComponent implements OnInit{

  
  #productoService = inject(ProductoService)
  #router = inject(Router)
  #auth = inject(AuthService)
  utils = inject(UtilService)



  productos: Producto[] = []


  ngOnInit(): void {
    this.load().subscribe()
  }


  create() {
    this.#router.navigate([PAGINAS.PRODUCTOS_CREAR])
  }

  edit(id: number) {
    this.#router.navigate([PAGINAS.PRODUCTOS_EDIT, id])
  }

  delete(id: number) {
    const res = confirm("¿Desea eliminar el producto?")
    if(res){
      this.utils.loaderShow()
      this.#productoService.delete(id).pipe(
        finalize(() => {this.utils.loaderHide()}),
      ).subscribe({
        next: () => {
          this.utils.toastShow({message: "Producto eliminado exitosamente", type: "success"})
          this.load().subscribe()
        },
        error: (err) => {
          this.utils.handleError(err)
        }
      })
    }
  }


  private load() {
    this.utils.loaderShow()
    return this.#productoService.list().pipe(
      finalize(() => {this.utils.loaderHide()}),
      tap((data) => this.productos = data)
    )
  }

  logout() {
    this.#auth.logout()
  }

}
