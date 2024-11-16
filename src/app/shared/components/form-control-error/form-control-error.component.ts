import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-form-control-error',
  standalone: true,
  imports: [],
  template: `
    @if(control.touched || control.dirty ) {
      @if(control.hasError("required")) {
      <div class="fce-error">El campo es requerido.</div>
      }
      @else if(control.hasError("min")) {
        <div class="fce-error">El valor debe ser mayor o igual a {{control.getError("min").min}}</div>
      }
      @else if(control.hasError("max")) {
        <div class="fce-error">El valor debe ser menor o igual a {{control.getError("max").max}}</div>
      }
      @else if(control.hasError("email")) {
        <div class="fce-error">'El email no es válido.</div>
      }
      @else if(control.hasError("minlength")) {
        <div class="fce-error">El campo debe tener como mínimo {{control.getError("minlength").requiredLength}} caracteres de largo.</div>
      }
      @else if(control.hasError("maxlength")) {
        <div class="fce-error">El campo debe tener como máximo {{control.getError("maxlength").requiredLength}} caracteres de largo.</div>
      }
    }
    
  `,
  styles: [
    `
      .fce-error {
        color: red
      }
    `
  ]
  
})
export class FormControlErrorComponent {

  @Input({required: true}) control!: FormControl
}
