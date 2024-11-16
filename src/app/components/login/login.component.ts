import { Component, inject } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { UtilService } from '../../services/utils.service';
import { AuthService } from '../../services/auth.service';
import { FormControlErrorComponent } from '../../shared/components/form-control-error/form-control-error.component';
import { finalize } from 'rxjs';
import { Router } from '@angular/router';
import { PAGINAS } from '../../shared/paginas.const';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormControlErrorComponent,
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {


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
      Validators.required
    ]]
  })



  submit() {
    this.utils.trimControlsValues(this.form)
    if(this.form.invalid) {return;}

    const values = this.form.getRawValue()
    this.utils.loaderShow()
    
    this.auth.login({
      email: values.email,
      password: values.password
    }).pipe(finalize(() => this.utils.loaderHide())).subscribe({
      next: () => {
        window.location.reload()
      },
      error: (err) => {
        this.utils.handleError(err)
      }
    })
  }

  register() {
    this.router.navigate([PAGINAS.REGISTER])
  }
}
