import { Component, inject, OnInit, signal } from '@angular/core';

import { ProdutoService } from '../../services/produtoService/produto.service';
import { Produto } from '../../models/produtos/produto';
import { ProdutoCard } from '../../components/produto-card/produto-card';
import { PedidoService } from '../../services/pedidoService/pedido.service';
import { EnderecoService } from '../../services/enderecoService/endereco.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { SelecionarEnderecoDialog } from '../../components/dialogs/selecionar-endereco-dialog/selecionar-endereco-dialog';
import { Router, RouterLink } from '@angular/router';
import { CarrinhoService } from '../../services/carrinhoService/carrinho.service';

@Component({
  selector: 'app-produtos',
  imports: [ProdutoCard, RouterLink],
  templateUrl: './produtos.html',
  styleUrl: './produtos.css',
})
export class Produtos implements OnInit {

  private carrinhoService = inject(CarrinhoService)

  private produtoService = inject(ProdutoService);

  private snackBar = inject(MatSnackBar);


  produtos = signal<Produto[]>([]);

  ngOnInit(): void {
    this.produtoService.listar().subscribe({
      next: (produtos) => {
        this.produtos.set(produtos);
        console.log(this.produtos)
      },

      error: (erro) => {
        console.error(erro);
      }
    });
  }


  adicionarAoCarrinho(evento: any) {

    this.carrinhoService
      .adicionarItem({

        produtoId: evento.produtoId,

        quantidade: evento.quantidade

      })
      .subscribe({

        next: () => {

          this.carrinhoService
            .buscarMeuCarrinho()
            .subscribe(carrinho => {

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

            });

          this.snackBar.open(
            'Produto adicionado ao carrinho',
            'Fechar',
            {
              duration: 3000
            }
          );

        },

        error: erro => {

          this.snackBar.open(
            erro.error?.message ??
            'Erro ao adicionar produto',
            'Fechar',
            {
              duration: 4000
            }
          );

        }

      });

  }
  //   comprarProduto(evento: any) {

  //   this.enderecoService
  //     .listar()
  //     .subscribe({

  //       next: enderecos => {

  //         if (enderecos.length === 0) {

  //           const snackBarRef = this.snackBar.open(
  //             'Cadastre um endereço antes de realizar uma compra.',
  //             'Cadastrar',
  //             {
  //               duration: 5000,
  //               panelClass: ['success-snackbar']
  //             }
  //           );

  //           snackBarRef.onAction()
  //             .subscribe(() => {

  //               this.router.navigate([
  //                 '/enderecos/novo'
  //               ]);

  //             });

  //           return;
  //         }

  //         const dialogRef = this.dialog.open(
  //           SelecionarEnderecoDialog,
  //           {
  //             width: '600px',
  //             data: {
  //               enderecos
  //             }
  //           }
  //         );

  //         dialogRef
  //           .afterClosed()
  //           .subscribe(enderecoId => {

  //             if (!enderecoId) {
  //               return;
  //             }

  //             this.pedidoService
  //               .salvar({

  //                 enderecoId,

  //                 itens: [
  //                   {
  //                     produtoId: evento.produtoId,
  //                     quantidade: evento.quantidade
  //                   }
  //                 ]

  //               })
  //               .subscribe({

  //                 next: () => {

  //                   this.snackBar.open(
  //                     'Pedido realizado com sucesso!',
  //                     'Fechar',
  //                     {
  //                       duration: 3000,
  //                       panelClass: ['success-snackbar']
  //                     }
  //                   );

  //                 },

  //                 error: (error) => {

  //                   this.snackBar.open(
  //                     error.error?.message ??
  //                     'Erro ao realizar pedido',
  //                     'Fechar',
  //                     {
  //                       duration: 4000
  //                     }
  //                   );

  //                 }

  //               });

  //           });

  //       },

  //       error: () => {

  //         this.snackBar.open(
  //           'Erro ao carregar os endereços.',
  //           'Fechar',
  //           {
  //             duration: 4000
  //           }
  //         );

  //       }

  //     });

  // }
}
