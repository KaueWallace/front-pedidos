import { Component, inject, OnInit, signal } from '@angular/core';
import { Pedido } from '../../models/pedidos/pedido';
import { PedidoService } from '../../services/pedidoService/pedido.service';

import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { PedidoCard } from '../../components/pedido-card/pedido-card';

@Component({
  selector: 'app-meus-pedidos',
  imports: [MatIconModule, RouterLink, PedidoCard],
  templateUrl: './meus-pedidos.html',
  styleUrl: './meus-pedidos.css',
})
export class MeusPedidos implements OnInit {
  private pedidoService = inject(PedidoService);

  pedidos = signal<Pedido[]>([]);

  ngOnInit(): void {

    this.pedidoService
      .listarMeusPedidos()
      .subscribe({
        next: pedidos => {
          this.pedidos.set(pedidos);
          console.log(pedidos)
        }
      });

  }
}
