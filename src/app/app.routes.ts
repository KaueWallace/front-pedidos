import { Routes } from '@angular/router';
import { Produtos } from './pages/produtos/produtos';
import { Login } from './pages/login/login';
import { MainLayout } from './pages/main-layout/main-layout';
import { MeusPedidos } from './pages/meus-pedidos/meus-pedidos';
import { DetalhePedido } from './pages/detalhe-pedido/detalhe-pedido';
import { Enderecos } from './pages/enderecos/enderecos';
import { CadastrarEndereco } from './pages/cadastrar-endereco/cadastrar-endereco';
import { EditarEndereco } from './pages/editar-endereco/editar-endereco';
import { CarrinhoPage } from './pages/carrinho/carrinho';

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
        path: '',
        component: MainLayout,
        children: [

            {
                path: 'produtos',
                component: Produtos
            },
            {
                path: 'meus-pedidos',
                component: MeusPedidos
            },
            {
                path: 'meus-pedidos/:id',
                component: DetalhePedido
            },
            {
                path: 'enderecos',
                component: Enderecos
            },
            {
                path: 'enderecos/novo',
                component: CadastrarEndereco
            },
            {
                path: 'enderecos/editar/:id',
                component: EditarEndereco
            },
            {
                path: 'carrinho',
                component: CarrinhoPage
            }
        ]
    }

];
