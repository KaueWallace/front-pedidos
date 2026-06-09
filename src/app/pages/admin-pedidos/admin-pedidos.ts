import {
  Component,
  OnInit,
  inject,
  signal
} from '@angular/core';

import { MatSnackBar } from '@angular/material/snack-bar';

import { MatIconModule } from '@angular/material/icon';

import {
  MatFormFieldModule
} from '@angular/material/form-field';

import {
  MatSelectModule
} from '@angular/material/select';

import {
  MatPaginatorModule,
  PageEvent
} from '@angular/material/paginator';

import { PedidoService } from '../../services/pedidoService/pedido.service';
import { Pedido } from '../../models/pedidos/pedido';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-admin-pedidos',

  imports: [
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    MatPaginatorModule,
    DatePipe,
    RouterLink
  ],

  templateUrl: './admin-pedidos.html',

  styleUrl: './admin-pedidos.css'
})
export class AdminPedidos
  implements OnInit {

  private pedidoService =
    inject(PedidoService);

  private snackBar =
    inject(MatSnackBar);

  pedidos =
    signal<Pedido[]>([]);

  totalItens =
    signal(0);

  statusSelecionado =
    signal('TODOS');

  paginaAtual = 0;

  tamanhoPagina = 3;

  ngOnInit(): void {

    this.carregarPedidos();

  }

  carregarPedidos(): void {

    this.pedidoService
      .listarTodosPedidos(
        this.statusSelecionado(),
        this.paginaAtual,
        this.tamanhoPagina
      )
      .subscribe({

        next: page => {

          this.pedidos.set(
            page.content
          );

          this.totalItens.set(
            page.totalElements
          );

        },

        error: () => {

          this.snackBar.open(
            'Erro ao carregar pedidos',
            'Fechar',
            {
              duration: 4000
            }
          );

        }

      });

  }

  alterarStatus(
    pedidoId: number,
    status: string
  ): void {

    this.pedidoService
      .atualizarStatus(
        pedidoId,
        status
      )
      .subscribe({

        next: () => {

          this.snackBar.open(
            'Status atualizado com sucesso!',
            'Fechar',
            {
              duration: 3000,
              panelClass: [
                'success-snackbar'
              ]
            }
          );

          this.carregarPedidos();

        },

        error: (erro: any) => {

          this.snackBar.open(
            erro.error?.message ??
            'Erro ao atualizar status',
            'Fechar',
            {
              duration: 4000
            }
          );

        }

      });

  }

  filtrar(
    status: string
  ) {

    this.statusSelecionado.set(
      status
    );

    this.paginaAtual = 0;

    this.carregarPedidos();

  }

  mudarPagina(
    event: PageEvent
  ) {

    this.paginaAtual =
      event.pageIndex;

    this.tamanhoPagina =
      event.pageSize;

    this.carregarPedidos();

  }

}