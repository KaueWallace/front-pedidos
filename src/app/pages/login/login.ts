import { Component, inject, signal } from '@angular/core';

import {FormGroup, FormControl, ReactiveFormsModule} from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule, 
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private authService = inject(AuthService);
  private router = inject(Router)

  loginForm = new FormGroup({
      email: new FormControl(''),
      senha: new FormControl('')
    }
  )

  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  login(){
    const dados = this.loginForm.value;

    this.authService.login({
      email: dados.email!,
      senha: dados.senha!
    }).subscribe({
      next: resposta => {
        this.authService.salvarToken(
          resposta.token
        );
        this.router.navigate(['/produtos'])
        console.log("Login realizado com sucesso!")
      },
      error: erro => {
        console.error('Erro ao logar', erro)
      },
      complete: () => {
        this.loginForm.reset()
      }
    })
  }
}
