import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { LoginRequest } from '../../models/login/loginRequest';
import { Observable } from 'rxjs';
import { LoginResponse } from '../../models/login/loginResponse';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);

  private api = 'http://172.25.1.60:8010/auth';

  login(dados: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(
      `${this.api}/login`,
      dados
    );
  }

  register(data: { nome: string, email: string, senha: string }){
    return this.http.post(
      `${this.api}/register`,
      data
    )
  }

  salvarToken(token: string): void {
    localStorage.setItem('token', token)
  }

  salvarRole(role: string){
    localStorage.setItem('role', role)
  }

  obterToken(): string | null {
    return localStorage.getItem('token');
  }

  getRole(): string | null {
    return localStorage.getItem('role');

  }

  isAdmin(): boolean {
    return this.getRole() === 'ADMIN';
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    this.router.navigate(['/login'])
  }

  estaLogado(): boolean {
    return !!this.obterToken();
  }
}
