import { Component, inject, OnInit, signal } from '@angular/core';

import { EnderecoService } from '../../services/enderecoService/endereco.service';
import { Endereco } from '../../models/pedidos/endereco';
import { EnderecoCard } from '../../components/endereco-card/endereco-card';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RouterLink } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialog } from '../../components/dialogs/confirm-dialog/confirm-dialog';


@Component({
  selector: 'app-enderecos',
  imports: [
    EnderecoCard,
    MatIconModule,
    RouterLink,
    ConfirmDialog
  ],
  templateUrl: './enderecos.html',
  styleUrl: './enderecos.css',
})
export class Enderecos implements OnInit {

  private enderecoService = inject(EnderecoService);

  private snackBar = inject(MatSnackBar);

  enderecos = signal<Endereco[]>([]);

  private _snackBar = inject(MatSnackBar);

  private dialog = inject(MatDialog);

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

  const dialogRef = this.dialog.open(
    ConfirmDialog,
    {
      width: '420px',
      data: {
        mensagem:
          'Deseja realmente excluir este endereço?'
      }
    }
  );

  dialogRef
    .afterClosed()
    .subscribe(confirmado => {

      if (!confirmado) {
        return;
      }

      this.enderecoService
        .excluir(id)
        .subscribe({

          next: () => {

            this.snackBar.open(
              'Endereço removido com sucesso',
              'Fechar',
              {
                duration: 3000,
                panelClass: [
                  'success-snackbar'
                ]
              }
            );

            this.enderecos.update(
              enderecos =>
                enderecos.filter(
                  e => e.id !== id
                )
            );

          },

          error: (erro: any) => {

            this.snackBar.open(
              erro.error?.message ??
              'Erro ao remover endereço',
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