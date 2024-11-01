import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';

@Component({
  selector: 'app-editar-clientes',
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
  templateUrl: './editar-clientes.component.html',
  styleUrl: './editar-clientes.component.css'
})
export class EditarClientesComponent {

  // atributos
  mensagemSucesso: string = "";
  mensagemErro: string = "";
  id: string = "";

  constructor(
    private httpClient: HttpClient,
    private activatedRoute: ActivatedRoute,
    private spinnerService: NgxSpinnerService
  ) {
  }

  ngOnInit() {

    this.id = this.activatedRoute.snapshot.paramMap.get('id') as string;

    this.spinnerService.show();

    this.httpClient.get(`${environment.clientesApi}/${this.id}`)
      .subscribe({
        next: (data) => {
          this.form.patchValue(data); // preenchendo o formulario
          this.spinnerService.hide();
        }
      })
  }

  form = new FormGroup({

    nome: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(150)

    ]),

    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),

    cpf: new FormControl('', [
      Validators.required,
      Validators.pattern(/^\d{11}$/)
    ])
  });

  // função para verificar o 'estado' de cada campo do formulário

  get f() {
    return this.form.controls;
  }

  onSubmit() {

    this.mensagemSucesso = '';
    this.mensagemErro = '';

    this.spinnerService.show();

    this.httpClient.put(`${environment.clientesApi}/${this.id}`, this.form.value)
      .subscribe({
        next: (data: any) => {
          this.mensagemSucesso = `Cliente ${data.nome} atualizado com sucesso.`;
          this.spinnerService.hide();
        },
        error: (e) => {
          // exibindo mensagem de erro
          this.mensagemErro = e.error.message;
          this.spinnerService.hide();
        }
      });
  };

}