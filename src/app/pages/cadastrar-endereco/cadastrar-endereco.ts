import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { EnderecoService } from '../../services/enderecoService/endereco.service';
import { EnderecoRequest } from '../../models/enderecos/enderecoRequest';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {MatSnackBar} from '@angular/material/snack-bar';  

@Component({
  selector: 'app-cadastrar-endereco',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    RouterLink
  ],
  templateUrl: './cadastrar-endereco.html',
  styleUrl: './cadastrar-endereco.css',
})
export class CadastrarEndereco {
  form = new FormGroup({

    cep: new FormControl('', [
      Validators.required
    ]),

    numero: new FormControl('', [
      Validators.required
    ]),

    complemento: new FormControl(''),

    bairro: new FormControl('', [
      Validators.required
    ]),

    cidade: new FormControl('', [
      Validators.required
    ]),

    estado: new FormControl('', [
      Validators.required
    ])

  });


  private enderecoService = inject(EnderecoService);

  private router = inject(Router);

  private _snackBar = inject(MatSnackBar);

  openSnackBar(message: string, action: string){
    this._snackBar.open(message, action, { duration: 2000, panelClass: 'success-snackbar'} );
  }

  salvar() {

    if (this.form.invalid) {
      return;
    }

    this.enderecoService
      .cadastrar(
        this.form.getRawValue() as EnderecoRequest
      )
      .subscribe({
        next: () => {

          this.router.navigate([
            '/enderecos'
          ]);

          this.openSnackBar('Endereço cadastrado com sucesso!', 'Fechar');
        },
        error: (error) => {
           alert('ENTROU NO ERROR');
          this.openSnackBar('Erro ao cadastrar endereço!', 'Fechar');
          console.error(error)
        }
      });
    }
  }
