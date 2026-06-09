import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Produto } from '../../models/produtos/produto';
import { ProdutoRequest } from '../../models/produtos/produtoRequest';
import { Page } from '../../models/page';

@Injectable({
  providedIn: 'root',
})
export class ProdutoService {
  private http = inject(HttpClient);

  private api = 'http://localhost:8080/produtos';

  listar(page = 0, size = 3) {
    return this.http.get<Page<Produto>>(
    this.api,
    {
      params: {
        page,
        size
      }
    }
  );

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

  buscar(nome: string) {

    return this.http.get<Produto[]>(
      `${this.api}/buscar`,
      {
        params: {
          nome
        }
      }
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
