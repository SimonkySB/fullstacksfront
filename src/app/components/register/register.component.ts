import { Component, inject } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UtilService } from '../../services/utils.service';
import { PAGINAS } from '../../shared/paginas.const';
import { finalize } from 'rxjs';
import { FormControlErrorComponent } from '../../shared/components/form-control-error/form-control-error.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    FormControlErrorComponent,
    ReactiveFormsModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  fb = inject(NonNullableFormBuilder)
  auth = inject(AuthService)
  utils = inject(UtilService)
  router = inject(Router)
  

  form = this.fb.group({
    email: ["", [
      Validators.required,
      Validators.email
    ]],
    password: ["", [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(16),
    ]],
    fullname: ["", [
      Validators.required,
      Validators.minLength(1),
      Validators.maxLength(100)
    ]]
  })

  submit() {
    this.utils.trimControlsValues(this.form)
    if(this.form.invalid) {return;}

    const values = this.form.getRawValue()
    this.utils.loaderShow()
    
    this.auth.registro({
      email: values.email,
      password: values.password,
      fullname: values.fullname
    }).pipe(finalize(() => this.utils.loaderHide())).subscribe({
      next: () => {
        this.utils.toastShow({message: "Registro exitoso", type: 'success'})
        this.router.navigate([PAGINAS.LOGIN])
      },
      error: (err) => {
        this.utils.handleError(err)
      }
    })
  }

  login() {
    this.router.navigate([PAGINAS.LOGIN])
  }
}
