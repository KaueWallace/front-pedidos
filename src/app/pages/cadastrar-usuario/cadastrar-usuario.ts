import { Component, inject } from '@angular/core';

import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { Router, RouterLink } from '@angular/router';

import { MatSnackBar } from '@angular/material/snack-bar';

import { MatFormFieldModule } from '@angular/material/form-field';

import { MatInputModule } from '@angular/material/input';

import { MatButtonModule } from '@angular/material/button';

import { MatIconModule } from '@angular/material/icon';

import { AuthService } from '../../services/authService/auth.service';

@Component({
  selector: 'app-cadastrar-usuario',

  imports: [
    ReactiveFormsModule,
    RouterLink,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],

  templateUrl: './cadastrar-usuario.html',

  styleUrl: './cadastrar-usuario.css'
})
export class CadastrarUsuario {

  private fb =
    inject(FormBuilder);

  private authService =
    inject(AuthService);

  private snackBar =
    inject(MatSnackBar);

  private router =
    inject(Router);

  mostrarSenha = false;

  mostrarConfirmacao = false;

  form = this.fb.group({

    email: [
      '',
      [
        Validators.required,
        Validators.email
      ]
    ],

    nome: [
      '',
      [
        Validators.required
      ]
    ],

    senha: [
      '',
      [
        Validators.required,
        Validators.minLength(6)
      ]
    ],

    confirmarSenha: [
      '',
      Validators.required
    ]

  });

  cadastrar() {

    if (this.form.invalid) {

      this.form.markAllAsTouched();

      return;

    }

    const senha =
      this.form.value.senha!;

    const confirmarSenha =
      this.form.value.confirmarSenha!;

    if (senha !== confirmarSenha) {

      this.snackBar.open(
        'As senhas não coincidem',
        'Fechar',
        {
          duration: 4000
        }
      );

      return;
    }

    this.authService
      .register({
        nome: this.form.value.nome!,

        email: this.form.value.email!,

        senha: senha

      })
      .subscribe({

        next: () => {

          this.snackBar.open(
            'Conta criada com sucesso!',
            'Fechar',
            {
              duration: 3000,
              panelClass: [
                'success-snackbar'
              ]
            }
          );

          this.router.navigate([
            '/login'
          ]);

        },

        error: () => {

          this.snackBar.open(
            'E-mail já cadastrado',
            'Fechar',
            {
              duration: 4000
            }
          );

        }

      });

  }

}