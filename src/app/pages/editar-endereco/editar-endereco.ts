import { Component, inject } from '@angular/core';
import { EnderecoRequest } from '../../models/enderecos/enderecoRequest';
import { EnderecoService } from '../../services/enderecoService/endereco.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {MatSnackBar} from '@angular/material/snack-bar';  

@Component({
  selector: 'app-editar-endereco',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    RouterLink
  ],
  templateUrl: './editar-endereco.html',
  styleUrl: './editar-endereco.css',
})
export class EditarEndereco {
  private route = inject(ActivatedRoute);

  private router = inject(Router);

  private enderecoService =
    inject(EnderecoService);

  form = new FormGroup({

    cep: new FormControl('', Validators.required),

    numero: new FormControl('', Validators.required),

    complemento: new FormControl(''),

    bairro: new FormControl('', Validators.required),

    cidade: new FormControl('', Validators.required),

    estado: new FormControl('', Validators.required)

  });

  enderecoId!: number;
  private _snackBar = inject(MatSnackBar);

  ngOnInit(): void {

    this.enderecoId = Number(
      this.route.snapshot.paramMap.get('id')
    );

    this.enderecoService
      .buscarPorId(this.enderecoId)
      .subscribe({
        next: endereco => {

          this.form.patchValue({

            cep: endereco.cep,
            numero: endereco.numero,
            complemento: endereco.complemento,
            bairro: endereco.bairro,
            cidade: endereco.cidade,
            estado: endereco.estado

          });

        }
      });

  }

  openSnackBar(message: string, action: string){
    this._snackBar.open(message, action, { duration: 2000, panelClass: 'success-snackbar'} );
  }

  salvar() {

    if (this.form.invalid) {
      return;
    }

    this.enderecoService
      .editar(
        this.enderecoId,
        this.form.getRawValue() as EnderecoRequest
      )
      .subscribe({
        next: () => {

          this.router.navigate([
            '/enderecos'
          ]);

          this.openSnackBar('Endereço atualizado com sucesso!', 'Fechar');
        },
        error: (error) => {
           this.openSnackBar('Erro ao atualizar endereço!', 'Fechar');
           console.error(error)
        }
      });

  }
}
