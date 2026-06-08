import { Component, input, output } from '@angular/core';
import { Pedido } from '../../models/pedidos/pedido';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-pedido-card',
  imports: [RouterLink, DatePipe],
  templateUrl: './pedido-card.html',
  styleUrl: './pedido-card.css',
})
export class PedidoCard{
  pedido = input.required<Pedido>();

  cancelar = output<number>();

  cancelarPedido() {
    this.cancelar.emit(
      this.pedido().id
    );
  }
}
