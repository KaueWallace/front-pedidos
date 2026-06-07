import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Endereco } from '../../models/pedidos/endereco';
import { EnderecoRequest } from '../../models/enderecos/enderecoRequest';

@Injectable({
  providedIn: 'root',
})
export class EnderecoService {
  private http = inject(HttpClient)

  private api = `http://localhost:8080`

  listar() {
    return this.http.get<Endereco[]>(
      `${this.api}/enderecos/meus`
    );
  }

  cadastrar(endereco: EnderecoRequest) {
    return this.http.post(
      `${this.api}/enderecos`,
      endereco
    );
  }

  buscarPorId(id: number) {
    return this.http.get<Endereco>(
      `${this.api}/enderecos/${id}`
    );
  }

  editar(id: number, endereco: EnderecoRequest) {
    return this.http.put<Endereco>(
      `${this.api}/enderecos/${id}`,
      endereco
    );
  }

  excluir(id: number) {
    return this.http.delete(
      `${this.api}/enderecos/${id}`
    );
  }
}
