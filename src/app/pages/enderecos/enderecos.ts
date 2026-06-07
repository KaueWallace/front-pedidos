import { Component, inject, OnInit, signal } from '@angular/core';

import { EnderecoService } from '../../services/enderecoService/endereco.service';
import { Endereco } from '../../models/pedidos/endereco';
import { EnderecoCard } from '../../components/endereco-card/endereco-card';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-enderecos',
  imports: [
    EnderecoCard,
    MatIconModule,
    RouterLink
  ],
  templateUrl: './enderecos.html',
  styleUrl: './enderecos.css',
})
export class Enderecos implements OnInit {

  private enderecoService = inject(EnderecoService);

  private snackBar = inject(MatSnackBar);

  enderecos = signal<Endereco[]>([]);

  private _snackBar = inject(MatSnackBar);

  ngOnInit(): void {

    this.enderecoService
      .listar()
      .subscribe({
        next: enderecos => {
          this.enderecos.set(enderecos);
        }
      });

  }

  openSnackBar(message: string, action: string){
    this._snackBar.open(message, action, { duration: 2000, panelClass: 'success-snackbar'} );
  }

  excluirEndereco(id: number) {

    this.enderecoService
      .excluir(id)
      .subscribe({
        next: () => {

          this.enderecos.update(
            enderecos =>
              enderecos.filter(
                endereco => endereco.id !== id
              )
          );

          this.snackBar.open(
            'Endereço removido com sucesso',
            'Fechar',
            {
              duration: 3000
            }
          );

        },
        error: (error) => {
          this.openSnackBar(error.error.message, 'Fechar');
           console.error(error)
        }
      });

  }


}