import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Pedido } from '../../models/pedidos/pedido';
import { PedidoRequest } from '../../models/pedidos/pedidoRequest';

@Injectable({
  providedIn: 'root',
})
export class PedidoService {
  private http = inject(HttpClient);
  private api = `http://localhost:8080`;

  listarTodosPedidos(status?: string) {

    let params = {};

    if (status &&
      status !== 'TODOS') {

      params = {
        status
      };

    }

    return this.http.get<Pedido[]>(
      `${this.api}/pedidos`,
      {
        params
      }
    );

  }

  listarMeusPedidos(status?: string) {

    if (status) {

      return this.http.get<Pedido[]>(
        `${this.api}/pedidos/meus?status=${status}`
      );

    }

    return this.http.get<Pedido[]>(
      `${this.api}/pedidos/meus`
    );

  }

  buscarMeuPedido(id: number) {
    return this.http.get<Pedido>(
      `${this.api}/pedidos/meu/${id}`
    );
  }

  buscarPorId(id: number){
    return this.http.get<Pedido>(
      `${this.api}/pedidos/${id}`
    )
  }


  salvar(dto: PedidoRequest) {
    return this.http.post(
      `${this.api}/pedidos`,
      dto
    );
  }

  atualizarStatus(id: number, status: string) {
    return this.http.patch(
      `${this.api}/pedidos/${id}/status`,
      {
        status
      }
    );
  }

  cancelarPedido(id: number) {
    return this.http.patch(
      `${this.api}/pedidos/meus/${id}/cancelar`,
      {},
      {
        responseType: 'text'
      }
    );
  }
}
