import { ItemPedidoRequest } from './itemPedidoRequest';

export interface PedidoRequest {
  enderecoId: number;
  itens: ItemPedidoRequest[];
}