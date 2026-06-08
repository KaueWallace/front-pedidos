import {
  Component,
  inject,
  OnInit
} from '@angular/core';

import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import {
  ActivatedRoute,
  Router,
  RouterLink
} from '@angular/router';

import { MatSnackBar } from '@angular/material/snack-bar';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { ProdutoService } from '../../services/produtoService/produto.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-editar-produto',

  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    RouterLink
  ],

  templateUrl: './editar-produto.html',

  styleUrl: './editar-produto.css'
})
export class EditarProduto
  implements OnInit {

  private produtoService =
    inject(ProdutoService);

  private snackBar =
    inject(MatSnackBar);

  private router =
    inject(Router);

  private route =
    inject(ActivatedRoute);

  produtoId!: number;

  form = new FormGroup({

    nome: new FormControl(
      '',
      Validators.required
    ),

    preco: new FormControl<number | null>(
      null,
      [
        Validators.required,
        Validators.min(0.01)
      ]
    ),

    estoque: new FormControl<number | null>(
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

  ngOnInit(): void {

    this.produtoId = Number(
      this.route
        .snapshot
        .paramMap
        .get('id')
    );

    this.carregarProduto();

  }

  carregarProduto() {

    this.produtoService
      .buscarPorId(this.produtoId)
      .subscribe({

        next: (produto) => {

          this.form.patchValue({

            nome: produto.nome,

            preco: produto.preco,

            estoque: produto.estoque,

            imagem: produto.imagem

          });

        }

      });

  }

  salvar() {

    if (this.form.invalid) {

      this.form.markAllAsTouched();

      return;

    }

    this.produtoService
      .atualizar(
        this.produtoId,
        this.form.getRawValue() as any
      )
      .subscribe({

        next: () => {

          this.snackBar.open(
            'Produto atualizado com sucesso!',
            'Fechar',
            {
              duration: 3000,
              panelClass: [
                'success-snackbar'
              ]
            }
          );

          this.router.navigate([
            '/admin/produtos'
          ]);

        },

        error: (erro: any) => {

          this.snackBar.open(
            erro.error?.message ??
            'Erro ao atualizar produto',
            'Fechar',
            {
              duration: 4000
            }
          );

        }

      });

  }

}