import {
  Component,
  inject,
  OnInit,
  signal
} from '@angular/core';

import { RouterLink } from '@angular/router';

import { MatSnackBar } from '@angular/material/snack-bar';

import { ProdutoService } from '../../services/produtoService/produto.service';

import { Produto } from '../../models/produtos/produto';

import { ConfirmDialog } from '../../components/dialogs/confirm-dialog/confirm-dialog';

import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-admin-produtos',

  imports: [
    RouterLink,
    MatIconModule
  ],

  templateUrl: './admin-produtos.html',

  styleUrl: './admin-produtos.css'
})
export class AdminProdutos
  implements OnInit {

  private produtoService =
    inject(ProdutoService);

  private snackBar =
    inject(MatSnackBar);

  private dialog =
    inject(MatDialog);

  produtos =
    signal<Produto[]>([]);

  ngOnInit(): void {

    this.carregarProdutos();

  }

  carregarProdutos() {

    this.produtoService
      .listar()
      .subscribe({

        next: produtos => {

          this.produtos.set(
            produtos
          );

        }

      });

  }

  excluirProduto(
    id: number
  ) {

    const dialogRef =
      this.dialog.open(
        ConfirmDialog,
        {
          width: '400px',

          data: {
            mensagem:
              'Deseja realmente excluir este produto?'
          }
        }
      );

    dialogRef
      .afterClosed()
      .subscribe(confirmado => {

        if (!confirmado) {
          return;
        }

        this.produtoService
          .excluir(id)
          .subscribe({

            next: () => {

              this.snackBar.open(
                'Produto removido com sucesso!',
                'Fechar',
                {
                  duration: 3000,
                  panelClass: [
                    'success-snackbar'
                  ]
                }
              );

              this.carregarProdutos();

            },

            error: () => {

              this.snackBar.open(
                'Erro ao remover produto',
                'Fechar',
                {
                  duration: 4000
                }
              );

            }

          });

      });

  }

}