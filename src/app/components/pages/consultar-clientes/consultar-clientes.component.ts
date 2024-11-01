import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { environment } from '../../../../environments/environment.development';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';

@Component({
  selector: 'app-consultar-clientes',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    NgxPaginationModule,
    NgxMaskPipe
  ],
  providers: [
    provideNgxMask()
  ],
  templateUrl: './consultar-clientes.component.html',
  styleUrl: './consultar-clientes.component.css'
})
export class ConsultarClientesComponent {

  // atributos
  clientes: any[] = []; // array de objetos
  pagina: number = 1;
  mensagemSucesso: string = '';

  // injeção de dependência
  constructor(
    private httpClient: HttpClient, 
    private sppinerService: NgxSpinnerService
  ) {
  }

  ngOnInit() {

    this.sppinerService.show();

    this.httpClient.get(environment.clientesApi)
      .subscribe({
        next: (data) => {
          this.clientes = data as any[];
          this.sppinerService.hide();
        }
      });      
  }

  //função para excluir o cliente selecionado na consulta
  onDelete(id: string) {

    //verificar se o usuário deseja realmente realizar a exclusão
    if(confirm('Deseja realmente excluir o cliente selecionado?')) {

      this.sppinerService.show();
      
      //enviando a requisição de exclusão para a API
      this.httpClient.delete(`${environment.clientesApi}/${id}`)
      .subscribe({
        next: (data: any) => {
          this.mensagemSucesso = `O cliente ${data.nome} foi excluído com sucesso!`;
          this.ngOnInit(); // recarregando a consulta de clientes
          //this.sppinerService.hide();
        }
      });
    }
  }

  //função para nabegar na paginação
  handlePageChange(event: any) {
    this.pagina = event;
  }

}