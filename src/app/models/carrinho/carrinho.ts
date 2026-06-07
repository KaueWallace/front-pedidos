import { ItemCarrinho } from './itemCarrinho';

export interface Carrinho {
  id: number;
  total: number;
  itens: ItemCarrinho[];
}