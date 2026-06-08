import { Component, inject, OnInit, signal } from '@angular/core';

import { CarrinhoService } from '../../services/carrinhoService/carrinho.service';

import { Carrinho } from '../../models/carrinho/carrinho';

import { MatSnackBar } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';
import { MatAnchor } from "@angular/material/button";
import { PedidoService } from '../../services/pedidoService/pedido.service';
import { EnderecoService } from '../../services/enderecoService/endereco.service';
import { MatDialog } from '@angular/material/dialog';
import { SelecionarEnderecoDialog } from '../../components/dialogs/selecionar-endereco-dialog/selecionar-endereco-dialog';

@Component({
  selector: 'app-carrinho',
  imports: [
    MatIconModule,
    RouterLink
  ],
  templateUrl: './carrinho.html',
  styleUrl: './carrinho.css'
})
export class CarrinhoPage implements OnInit {

  private carrinhoService = inject(
    CarrinhoService
  );

  private snackBar = inject(
    MatSnackBar
  );

  private router = inject(Router)

  private pedidoService = inject(PedidoService);

  private enderecoService = inject(EnderecoService);

  private dialog = inject(MatDialog);


  carrinho = signal<Carrinho | null>(
    null
  );

  ngOnInit(): void {

    this.carregarCarrinho();

  }

  carregarCarrinho() {

    this.carrinhoService
      .buscarMeuCarrinho()
      .subscribe({

        next: carrinho => {

          this.carrinho.set(
            carrinho
          );

        }

      });

  }

  removerItem(
    produtoId: number
  ) {

    this.carrinhoService
      .removerItem(
        produtoId
      )
      .subscribe({

        next: () => {
          this.atualizarBadge()
          this.snackBar.open(
            'Item removido',
            'Fechar',
            {
              duration: 3000
            }
          );

          this.carregarCarrinho();

        }

      });

  }

  limparCarrinho() {

    this.carrinhoService
      .limparCarrinho()
      .subscribe({

        next: () => {
          this.atualizarBadge()
          this.snackBar.open(
            'Carrinho limpo',
            'Fechar',
            {
              duration: 3000
            }
          );

          this.carregarCarrinho();

        }

      });

  }

  atualizarBadge() {

    this.carrinhoService
      .buscarMeuCarrinho()
      .subscribe({

        next: carrinho => {

          const quantidade =
            carrinho.itens.reduce(
              (total: number, item: any) =>
                total + item.quantidade,
              0
            );

          this.carrinhoService
            .atualizarQuantidade(
              quantidade
            );

        }

      });

  }

  finalizarCompra() {

    this.enderecoService
      .listar()
      .subscribe({

        next: enderecos => {

          if (enderecos.length === 0) {

            const snackBarRef = this.snackBar.open(
              'Cadastre um endereço antes de finalizar a compra.',
              'Cadastrar',
              {
                duration: 500,
                panelClass: ['success-snackbar']
              }
            );

            snackBarRef
              .onAction()
              .subscribe(() => {

                this.router.navigate([
                  '/enderecos/novo'
                ]);

              });

            return;
          }

          const dialogRef = this.dialog.open(
            SelecionarEnderecoDialog,
            {
              width: '600px',
              data: {
                enderecos
              }
            }
          );

          dialogRef
            .afterClosed()
            .subscribe(enderecoId => {

              if (!enderecoId) {
                this.snackBar.open(
                  'Selecione um endereço antes de finalizar a compra.',
                  'Ok',
                  {
                    duration: 4000,
                    panelClass: ['success-snackbar']
                  }
                );
                return;
              }

              const pedidoRequest = {

                enderecoId,

                itens: this.carrinho()!.itens.map(
                  item => ({
                    produtoId: item.produtoId,
                    quantidade: item.quantidade
                  })
                )

              };

              this.pedidoService
                .salvar(pedidoRequest)
                .subscribe({

                  next: () => {

                    this.carrinhoService
                      .atualizarQuantidade(0);

                    this.snackBar.open(
                      'Pedido realizado com sucesso!',
                      'Fechar',
                      {
                        duration: 3000,
                        panelClass: [
                          'success-snackbar'
                        ]
                      }
                    );

                    this.router.navigate([
                      '/meus-pedidos'
                    ]);

                  },

                  error: (erro: any) => {

                    const mensagem =
                      erro.error?.message ??
                      'Erro ao realizar pedido';

                    this.snackBar.open(
                      mensagem,
                      'Fechar',
                      {
                        duration: 4000
                      }
                    );

                  }

                });

            });

        }

      });

  }

}