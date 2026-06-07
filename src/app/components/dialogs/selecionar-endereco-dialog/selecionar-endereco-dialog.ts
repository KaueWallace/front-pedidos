import { Component, inject, signal } from '@angular/core';

import {
  MAT_DIALOG_DATA,
  MatDialogRef
} from '@angular/material/dialog';

import { Endereco } from '../../../models/enderecos/endereco'

@Component({
  selector: 'app-selecionar-endereco-dialog',
  templateUrl: './selecionar-endereco-dialog.html',
  styleUrl: './selecionar-endereco-dialog.css',
})
export class SelecionarEnderecoDialog {

  data = inject(MAT_DIALOG_DATA);

  dialogRef =
    inject(MatDialogRef<SelecionarEnderecoDialog>);

  enderecoSelecionado =
    signal<number | null>(null);

  isSelecionado(id: number): boolean {
    return this.enderecoSelecionado() === id;
  }

  confirmar() {

    this.dialogRef.close(
      this.enderecoSelecionado()
    );

  }

}