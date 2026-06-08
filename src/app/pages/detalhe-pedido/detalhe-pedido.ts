import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PedidoService } from '../../services/pedidoService/pedido.service';
import { Pedido } from '../../models/pedidos/pedido';
import { MatIconModule } from '@angular/material/icon';
import { DatePipe } from '@angular/common';
import { AuthService } from '../../services/authService/auth.service';

@Component({
  selector: 'app-detalhe-pedido',
  imports: [RouterLink, MatIconModule, DatePipe],
  templateUrl: './detalhe-pedido.html',
  styleUrl: './detalhe-pedido.css',
})
export class DetalhePedido {
  private route = inject(ActivatedRoute);

  private pedidoService = inject(PedidoService);

  private authService = inject(AuthService);

  private router = inject(Router);

  pedido = signal<Pedido | null>(null);

  veioDoAdmin = false;

  ngOnInit(): void {
    this.veioDoAdmin = this.router.url.startsWith('/admin');

    const id = Number(
      this.route.snapshot.paramMap.get('id')
    );

    if (this.isAdmin){
      this.pedidoService.buscarPorId(id)
        .subscribe({
          next: pedido => {
            this.pedido.set(pedido)
          }
        })
    } else {
      this.pedidoService
      .buscarMeuPedido(id)
      .subscribe({
        next: pedido => {
          this.pedido.set(pedido);
        }
      });
    }

    

  }

  get isAdmin(): boolean {
    return this.authService.isAdmin()
  }

}
