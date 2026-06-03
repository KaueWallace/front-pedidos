import { Component, inject, OnInit, signal } from '@angular/core';

import { ProdutoService } from '../../services/produtoService/produto.service';
import { Produto } from '../../models/produtos/produto';
import { ProdutoCard } from '../../components/produto-card/produto-card';

@Component({
  selector: 'app-produtos',
  imports: [ProdutoCard],
  templateUrl: './produtos.html',
  styleUrl: './produtos.css',
})
export class Produtos implements OnInit {
  private produtoService = inject(ProdutoService);

  

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
}
