import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Pedido } from '../../models/pedidos/pedido';

@Injectable({
  providedIn: 'root',
})
export class PedidoService {
  private http = inject(HttpClient);

  listarMeusPedidos() {
    return this.http.get<Pedido[]>(
        'http://localhost:8080/pedidos/meus'
    );
  }

  buscarMeuPedido(id: number) {
    return this.http.get<Pedido>(
      `http://localhost:8080/pedidos/meu/${id}`
    );
  }
}
