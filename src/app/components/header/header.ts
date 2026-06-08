import { Component, inject, OnInit } from '@angular/core';

import { MatIconModule } from '@angular/material/icon';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CarrinhoService } from '../../services/carrinhoService/carrinho.service';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatDivider } from '@angular/material/divider'
import { AuthService } from '../../services/authService/auth.service';

@Component({
  selector: 'app-header',
  imports: [MatIconModule, RouterLink, RouterLinkActive, MatButtonModule, MatMenuModule, MatDivider],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header implements OnInit {
  carrinhoState = inject(CarrinhoService);
  authService = inject(AuthService);

  ngOnInit(): void {
    this.carrinhoState
      .buscarMeuCarrinho()
      .subscribe(carrinho => {

        const quantidade =
          carrinho.itens.reduce(
            (total: number, item: any) =>
              total + item.quantidade,
            0
          );

        this.carrinhoState
          .atualizarQuantidade(
            quantidade
          );

      });
  }
}
