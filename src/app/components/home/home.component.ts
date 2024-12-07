import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ROLES } from '../../shared/roles.const';
import { PAGINAS } from '../../shared/paginas.const';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  template: `
  <div class="container">
    <button class="btn btn-danger mb-2" (click)="logout()">LOGOUT</button>
    <h4>Menu</h4>
    <ul>
      @for (item of paginas; track $index) {
        <button class="btn btn-sm btn-primary" (click)="navigate(item.url)">{{item.displayName}}</button>
      }
    </ul>
  </div>
  
  `
})
export class HomeComponent {

  authService = inject(AuthService)
  router = inject(Router)

  paginas = this.authService.hasRole(ROLES.ADMIN) ? [
    {
      url: PAGINAS.PRODUCTOS,
      displayName: "Gestión de Productos"
    }
  ] : []

  navigate(pagina: string) {
    this.router.navigate([pagina])
  }


  logout() {
    this.authService.logout()
  }



}
