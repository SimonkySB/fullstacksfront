import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { environment } from '../../environments/environment';
import { catchError } from 'rxjs';
import { ToastService } from '../shared/services/toast.service';

export const appInterceptor: HttpInterceptorFn = (req, next) => {

  const auth = inject(AuthService)
  const toast = inject(ToastService)
  

  if(req.url.startsWith(environment.apiUrl)){
    req = req.clone({headers: req.headers.append('Authorization', `Bearer ${auth.getToken() ?? ""}`) });
  }

  return next(req).pipe(
    catchError((err) => {
      if(err instanceof HttpErrorResponse && err.status === 401 || err.status === 403) {
        auth.logout()
        toast.show({type: 'danger', message: "La sessión expiró"})
      }

      throw err
    })
  );
};
