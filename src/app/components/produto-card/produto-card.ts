import { Component, inject, input, output, signal } from '@angular/core';
import { Produto } from '../../models/produtos/produto';

import {MatSnackBar} from '@angular/material/snack-bar';  
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-produto-card',
  imports: [MatIconModule, MatIconModule],
  templateUrl: './produto-card.html',
  styleUrl: './produto-card.css',
})
export class ProdutoCard {
  produto = input.required<Produto>();
  quantidade = signal(1);

  comprar = output<{
    produtoId: number;
    quantidade: number;
  }>();

  private _snackBar = inject(MatSnackBar);
  

  openSnackBar(message: string, action: string){
    this._snackBar.open(message, action, { duration: 2000, panelClass: 'success-snackbar'} );
  }


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

  comprarAgora(){
    this.comprar.emit({
      produtoId: this.produto().id,
      quantidade: this.quantidade()
    })
  }
}
