import { Component, inject, OnInit, signal } from '@angular/core';

import { ProdutoService } from '../../services/produtoService/produto.service';
import { Produto } from '../../models/produtos/produto';
import { ProdutoCard } from '../../components/produto-card/produto-card';
import { MatSnackBar } from '@angular/material/snack-bar';

import { CarrinhoService } from '../../services/carrinhoService/carrinho.service';

@Component({
  selector: 'app-produtos',
  imports: [ProdutoCard],
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
          const erroParser = JSON.parse(erro.error);
          this.snackBar.open(
            erroParser.message,
            'Fechar',
            {
              duration: 4000
            }
          );

        }

      });

  }

}
