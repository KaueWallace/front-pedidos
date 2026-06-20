import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ItemCarrinhoRequest } from '../../models/carrinho/itemCarrinhoRequest';

@Injectable({
  providedIn: 'root'
})
export class CarrinhoService {

  private http = inject(HttpClient);

  private api = 'http://172.1.5.60:8010/carrinho';


  quantidadeItens = signal<number>(0);

  atualizarQuantidade(quantidade: number) {
    this.quantidadeItens.set(quantidade);
  }

  adicionarItem(dto: ItemCarrinhoRequest) {
    return this.http.post(
      `${this.api}/itens`,
      dto,
      {
        responseType: 'text'
      }
    );
  }


  buscarMeuCarrinho() {
    return this.http.get<any>(
      `${this.api}/meu`
    );
  }

  removerItem(produtoId: number) {
    return this.http.delete(
      `${this.api}/itens/${produtoId}`,
      {
        responseType: 'text'
      }
    );
  }

  limparCarrinho() {
    return this.http.delete(
      `${this.api}/limpar`,
      {
        responseType: 'text'
      }
    );
  }

}