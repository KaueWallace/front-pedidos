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


import { PedidoService } from '../../services/pedidoService/pedido.service';
import { Pedido } from '../../models/pedidos/pedido';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-admin-pedidos',

  imports: [
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    DatePipe
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

  ngOnInit(): void {

    this.carregarPedidos();

  }

  carregarPedidos(): void {

    this.pedidoService
      .listarTodosPedidos()
      .subscribe({

        next: pedidos => {

          this.pedidos.set(
            pedidos
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

          this.pedidos.update(
            pedidos =>
              pedidos.map(pedido =>

                pedido.id === pedidoId
                  ? {
                      ...pedido,
                      status
                    }
                  : pedido

              )
          );

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

}