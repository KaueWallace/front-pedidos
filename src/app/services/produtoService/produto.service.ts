import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Produto } from '../../models/produtos/produto';
import { ProdutoRequest } from '../../models/produtos/produtoRequest';

@Injectable({
  providedIn: 'root',
})
export class ProdutoService {
  private http = inject(HttpClient);

  private api = 'http://localhost:8080/produtos';

  listar(): Observable<Produto[]> {
    return this.http.get<Produto[]>(this.api);
  }

  salvar(produto: ProdutoRequest) {
    return this.http.post<Produto>(
      this.api,
      produto
    );
  }

  buscarPorId(id: number) {
    return this.http.get<Produto>(
      `${this.api}/${id}`
    );

}

  atualizar(id: number, produto: ProdutoRequest) {
    return this.http.put(`${this.api}/${id}`, produto);

}

  excluir(id: number) {
    return this.http.delete(
      `${this.api}/${id}`
    );

  }
}
