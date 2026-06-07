import { Component, inject, input, output, signal } from '@angular/core';
import { Produto } from '../../models/produtos/produto';

import {MatSnackBar} from '@angular/material/snack-bar';  
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-produto-card',
  imports: [MatIconModule, MatIconModule],
  templateUrl: './produto-card.html',
  styleUrl: './produto-card.css',
})
export class ProdutoCard {
  produto = input.required<Produto>();
  quantidade = signal(1);

  addCarrinho = output<{
    produtoId: number;
    quantidade: number;
  }>();


  corEstoque(): string {

    const estoque = this.produto().estoque;

    if (estoque >= 10) {
      return 'var(--success)';
    }

    if (estoque >= 5) {
      return 'var(--warning)';
    }

    return 'var(--error)';
  }

  aumentar() {
    this.quantidade.update(q => q + 1);
  }

  diminuir() {

    if (this.quantidade() > 1) {
      this.quantidade.update(q => q - 1);
    }

  }

  adicionarAoCarrinho(){
    this.addCarrinho.emit({
      produtoId: this.produto().id,
      quantidade: this.quantidade()
    })
  }
}
