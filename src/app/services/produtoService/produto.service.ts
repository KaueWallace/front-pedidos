import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Produto } from '../../models/produtos/produto';

@Injectable({
  providedIn: 'root',
})
export class ProdutoService {
  private http = inject(HttpClient);

  private api = 'http://localhost:8080/produtos';

  listar(): Observable<Produto[]> {
    return this.http.get<Produto[]>(this.api);
  }
}
