import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PedidoService } from '../../services/pedidoService/pedido.service';
import { Pedido } from '../../models/pedidos/pedido';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-detalhe-pedido',
  imports: [RouterLink, MatIconModule],
  templateUrl: './detalhe-pedido.html',
  styleUrl: './detalhe-pedido.css',
})
export class DetalhePedido {
  private route = inject(ActivatedRoute);

  private pedidoService = inject(PedidoService);

   pedido = signal<Pedido | null>(null);

  ngOnInit(): void {

    const id = Number(
      this.route.snapshot.paramMap.get('id')
    );

    this.pedidoService
      .buscarMeuPedido(id)
      .subscribe({
        next: pedido => {
          this.pedido.set(pedido);
        }
      });

  }

}
