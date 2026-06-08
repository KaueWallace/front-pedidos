import { Component, inject } from '@angular/core';

import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { Router, RouterLink } from '@angular/router';

import { MatSnackBar } from '@angular/material/snack-bar';

import { ProdutoService } from '../../services/produtoService/produto.service';

import { MatFormFieldModule } from '@angular/material/form-field';

import { MatInputModule } from '@angular/material/input';

import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-cadastrar-produto',

  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatButton,
    MatIconModule,
    RouterLink
  ],

  templateUrl: './cadastrar-produto.html',
  styleUrl: './cadastrar-produto.css'
})
export class CadastrarProduto {

  private produtoService = inject(
    ProdutoService
  );

  private snackBar = inject(
    MatSnackBar
  );

  private router = inject(
    Router
  );

  form = new FormGroup({

    nome: new FormControl(
      '',
      Validators.required
    ),

    preco: new FormControl(
      null,
      [
        Validators.required,
        Validators.min(0.01)
      ]
    ),

    estoque: new FormControl(
      null,
      [
        Validators.required,
        Validators.min(0)
      ]
    ),

    imagem: new FormControl(
      '',
      Validators.required
    )

  });

  salvar() {

    if (this.form.invalid) {

      this.form.markAllAsTouched();

      return;
    }

    this.produtoService
      .salvar(
        this.form.getRawValue() as any
      )
      .subscribe({

        next: () => {

          this.snackBar.open(
            'Produto cadastrado com sucesso!',
            'Fechar',
            {
              duration: 3000,
              panelClass: [
                'success-snackbar'
              ]
            }
          );

          this.router.navigate([
            '/produtos'
          ]);

        },

        error: (erro: any) => {

          this.snackBar.open(
            erro.error?.message ??
            'Erro ao cadastrar produto',
            'Fechar',
            {
              duration: 4000
            }
          );

        }

      });

  }

}