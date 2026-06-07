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

  listarMeusPedidos() {
    return this.http.get<Pedido[]>(
      `${this.api}/pedidos/meus`
    );
  }

  buscarMeuPedido(id: number) {
    return this.http.get<Pedido>(
      `${this.api}/pedidos/meu/${id}`
    );
  }

  salvar(dto: PedidoRequest) {
    return this.http.post(
      `${this.api}/pedidos`,
      dto
    );
  }

  cancelarPedido(id: number) {
    return this.http.patch(
      `${this.api}/meus/${id}/cancelar`,
      {}
    );
  }
}
