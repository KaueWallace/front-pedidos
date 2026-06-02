import { Routes } from '@angular/router';
import { Produtos } from './pages/produtos/produtos';
import { Login } from './pages/login/login';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: Login
    },
    {
        path: 'produtos',
        component: Produtos
    }
];
