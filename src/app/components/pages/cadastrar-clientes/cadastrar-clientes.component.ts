import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { environment } from '../../../../environments/environment';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';

@Component({
  selector: 'app-cadastrar-clientes',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskDirective
  ],
  providers: [
    provideNgxMask()
  ],
  templateUrl: './cadastrar-clientes.component.html',
  styleUrl: './cadastrar-clientes.component.css'
})
export class CadastrarClientesComponent {

  // atributos
  mensagemSucesso: string = "";
  mensagemErro: string = "";

  constructor(
    private httpClient: HttpClient,
    private spinnerService: NgxSpinnerService
  ) {
  }

  form = new FormGroup({

    nome : new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(150)

    ]),

    email : new FormControl('', [
      Validators.required,
      Validators.email
    ]),

    cpf : new FormControl('', [
      Validators.required,
      Validators.pattern(/^\d{11}$/)
    ])
  });

  // função para verificar o 'estado' de cada campo do formulário

  get f() {
    return this.form.controls;
  }

  // função para capturar p evento SUBMIT do formulário
  onSubmit() {    

    this.mensagemSucesso = '';
    this.mensagemErro = '';

    this.spinnerService.show();

    this.httpClient.post(environment.clientesApi, this.form.value)
    .subscribe({
      next: (data: any) => {
        // exibindo mensagem de sucesso
        this.mensagemSucesso = `Parabéns, o cliente ${data.nome} foi cadastrado com sucesso.`;
        // limpar o formulário
        this.form.reset();
        this.spinnerService.hide();
      },
      error: (e) => {
        // exibindo mensagem de erro
        this.mensagemErro = e.error.message;
        this.spinnerService.hide();
      }
    });

  }
}