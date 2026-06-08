import { Component, inject, OnInit } from '@angular/core';

import { MatIconModule } from '@angular/material/icon';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CarrinhoService } from '../../services/carrinhoService/carrinho.service';

@Component({
  selector: 'app-header',
  imports: [MatIconModule, RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header implements OnInit {
  carrinhoState = inject(CarrinhoService);

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
