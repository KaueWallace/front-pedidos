import { Component, input } from '@angular/core';
import { Pedido } from '../../models/pedidos/pedido';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-pedido-card',
  imports: [RouterLink],
  templateUrl: './pedido-card.html',
  styleUrl: './pedido-card.css',
})
export class PedidoCard{
  pedido = input.required<Pedido>();
}
