import { Component, input, output } from '@angular/core';
import { Endereco } from '../../models/pedidos/endereco';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-endereco-card',
  imports: [MatIconModule, RouterLink],
  templateUrl: './endereco-card.html',
  styleUrl: './endereco-card.css',
})
export class EnderecoCard {
  endereco = input.required<Endereco>();

  excluir = output<number>();

  excluirEndereco() {
    this.excluir.emit(this.endereco().id);
  }
}
