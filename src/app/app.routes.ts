import { Routes } from '@angular/router';
import { ProductosListComponent } from './components/productos-list/productos-list.component';
import { ProductosFormComponent } from './components/productos-form/productos-form.component';
import { loginAccesGuard } from './guards/login-acces.guard';
import { PAGINAS } from './shared/paginas.const';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    {
        path: '',
        redirectTo: PAGINAS.PRODUCTOS,
        pathMatch: 'full'
    },
    {
        path: "",
        canActivate: [loginAccesGuard],
        children: [
            {
                path: PAGINAS.LOGIN,
                component: LoginComponent
            },
            {
                path: PAGINAS.REGISTER,
                component: RegisterComponent
            }
        ]
    },
    {
        path: "",
        canActivate: [authGuard],
        children: [
            {
                path: PAGINAS.PRODUCTOS,
                component: ProductosListComponent
            },
            {
                path: PAGINAS.PRODUCTOS_CREAR,
                component: ProductosFormComponent
            },
            {
                path: PAGINAS.PRODUCTOS_EDIT + "/:id",
                component: ProductosFormComponent
            },
        ]
    }
    
    

];
