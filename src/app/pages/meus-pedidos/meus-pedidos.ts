import { Component, inject, OnInit, signal } from '@angular/core';
import { Pedido } from '../../models/pedidos/pedido';
import { PedidoService } from '../../services/pedidoService/pedido.service';

import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { PedidoCard } from '../../components/pedido-card/pedido-card';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-meus-pedidos',
  imports: [MatIconModule, RouterLink, PedidoCard],
  templateUrl: './meus-pedidos.html',
  styleUrl: './meus-pedidos.css',
})
export class MeusPedidos implements OnInit {
  private pedidoService = inject(PedidoService);

  private snackBar = inject(
    MatSnackBar
  );

  pedidos = signal<Pedido[]>([]);

  ngOnInit(): void {

    this.pedidoService
      .listarMeusPedidos()
      .subscribe({
        next: pedidos => {
          this.pedidos.set(pedidos);
        }
      });

  }

  cancelarPedido(id: number) {
    
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

          this.pedidoService.listarMeusPedidos().subscribe({
            next: (pedidos) => {
              this.pedidos.set(pedidos)
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

  }
}
