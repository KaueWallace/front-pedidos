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
import { CadastrarProduto } from './pages/cadastrar-produto/cadastrar-produto';
import { AdminDashboard } from './pages/admin-dashboard/admin-dashboard';
import { AdminProdutos } from './pages/admin-produtos/admin-produtos';
import { EditarProduto } from './pages/editar-produto/editar-produto';
import { AdminPedidos } from './pages/admin-pedidos/admin-pedidos';

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
            },
            {
                path: 'admin/produtos/novo',
                component: CadastrarProduto
            },
            {
                path: 'admin',
                component: AdminDashboard
            },
            {
                path: 'admin/produtos',
                component: AdminProdutos
            },
            {
                path: 'admin/produtos/editar/:id',
                component: EditarProduto
            },
            {
                path: 'admin/pedidos',
                component: AdminPedidos
            },
            {
                path: 'admin/pedidos/:id',
                component: DetalhePedido
            }
            
        ]
    }

];
