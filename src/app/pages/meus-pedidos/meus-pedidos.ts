import { Component, inject, OnInit, signal } from '@angular/core';
import { Pedido } from '../../models/pedidos/pedido';
import { PedidoService } from '../../services/pedidoService/pedido.service';

import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { PedidoCard } from '../../components/pedido-card/pedido-card';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialog } from '../../components/dialogs/confirm-dialog/confirm-dialog';
import { DatePipe } from '@angular/common';



@Component({
  selector: 'app-meus-pedidos',
  imports: [MatIconModule, RouterLink, PedidoCard, MatSelectModule, FormsModule, ConfirmDialog],
  templateUrl: './meus-pedidos.html',
  styleUrl: './meus-pedidos.css',
})
export class MeusPedidos implements OnInit {
  private pedidoService = inject(PedidoService);

  private snackBar = inject(
    MatSnackBar
  );

  private dialog = inject(MatDialog);

  pedidos = signal<Pedido[]>([]);

  filtroStatus = '';

  ngOnInit(): void {

    this.pedidoService
      .listarMeusPedidos()
      .subscribe({
        next: pedidos => {
          this.pedidos.set(pedidos);
        }
      });

  }

  filtrarPedidos() {

    this.pedidoService
      .listarMeusPedidos(
        this.filtroStatus || undefined
      )
      .subscribe({

        next: pedidos => {

          this.pedidos.set(
            pedidos
          );

        }

      });

  }

  cancelarPedido(id: number) {

    const dialogRef = this.dialog.open(
      ConfirmDialog,
      {
        width: '400px',
        data: {
          mensagem:
            'Deseja realmente cancelar este pedido?'
        }
      }
    );

    dialogRef
      .afterClosed()
      .subscribe(confirmado => {

        if (!confirmado) {
          return;
        }

        this.pedidoService
          .cancelarPedido(id)
          .subscribe({

            next: () => {

              this.snackBar.open(
                'Pedido cancelado com sucesso',
                'Fechar',
                {
                  duration: 3000,
                  panelClass: [
                    'success-snackbar'
                  ]
                }
              );

              this.pedidoService
                .listarMeusPedidos()
                .subscribe({

                  next: pedidos => {

                    this.pedidos.set(
                      pedidos
                    );

                  }

                });

            },

            error: (erro: any) => {

              this.snackBar.open(
                erro.error?.message ??
                'Erro ao cancelar pedido',
                'Fechar',
                {
                  duration: 4000
                }
              );

            }

          });

      });

  }
}
