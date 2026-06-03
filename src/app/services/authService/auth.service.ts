import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { LoginRequest } from '../../models/login/loginRequest';
import { Observable } from 'rxjs';
import { LoginResponse } from '../../models/login/loginResponse';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);

  private api = 'http://localhost:8080/auth';

  login(dados: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(
      `${this.api}/login`,
      dados
    );
  }

  salvarToken(token: string): void {
    localStorage.setItem('token', token)
  }

  obterToken(): string | null {
    return localStorage.getItem('token');
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  estaLogado(): boolean {
    return !!this.obterToken();
  }
}
