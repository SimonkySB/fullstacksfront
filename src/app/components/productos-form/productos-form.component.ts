import { Component, inject, OnInit } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductoService } from '../../services/producto.service';
import { ActivatedRoute } from '@angular/router';
import { UtilService } from '../../services/utils.service';
import { Location } from '@angular/common';
import { FormControlErrorComponent } from '../../shared/components/form-control-error/form-control-error.component';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-productos-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormControlErrorComponent
  ],
  templateUrl: './productos-form.component.html',
  styleUrl: './productos-form.component.scss'
})
export class ProductosFormComponent implements OnInit{
  
  #fb = inject(NonNullableFormBuilder)
  #productoService = inject(ProductoService)
  #location = inject(Location)
  #route = inject(ActivatedRoute)
  #utils = inject(UtilService)
  

  form = this.#fb.group({
    id: [0],
    nombre: ["", [
      Validators.required,
      Validators.minLength(1),
      Validators.maxLength(100),
    ]],
    precio: [0, [
      Validators.required,
      Validators.min(0.01),
      Validators.max(10000000)
    ]],
    categoria: ["", [
      Validators.required,
      Validators.minLength(1),
      Validators.maxLength(50),
    ]]
  })

  ngOnInit(): void {
    const value = this.#route.snapshot.paramMap.get("id")
    if(value){
      this.#utils.loaderShow()

      this.#productoService.getById(Number(value)).pipe(
        finalize(() => this.#utils.loaderHide())
      ).subscribe({
        next: (producto) => {
          this.form.patchValue({
            id: producto.id,
            nombre: producto.nombre,
            precio: producto.precio,
            categoria: producto.categoria
          })
        },
        error: (err) => {
          this.#utils.handleError(err)
          this.#location.back()
        }
      })
    }
    
  }
  
  submit() {
    this.#utils.trimControlValue(this.form.controls.nombre)
    this.#utils.trimControlValue(this.form.controls.categoria)
    if(this.form.invalid){return}

    const values = this.form.getRawValue()
    if(values.id === 0) {
      this.#productoService.create({
        categoria: values.categoria,
        nombre: values.nombre,
        precio: values.precio
      }).subscribe({
        next: () => {
          this.#utils.toastShow({message: "Producto registrado exitosamente", type: "success"})
          this.#location.back()
        },
        error: (err) => {
          this.#utils.handleError(err)
        }
      })
    }
    else {
      this.#productoService.edit({
        id: values.id,
        categoria: values.categoria,
        nombre: values.nombre,
        precio: values.precio
      }).subscribe({
        next: () => {
          this.#utils.toastShow({message: "Producto actualizado exitosamente", type: "success"})
          this.#location.back()
        },
        error: (err) => {
          this.#utils.handleError(err)
        }
      })
    }

  }


  cancel() {
    this.#location.back()
  }
}
