import { Routes } from '@angular/router';
import { CadastrarClientesComponent } from './components/pages/cadastrar-clientes/cadastrar-clientes.component';
import { ConsultarClientesComponent } from './components/pages/consultar-clientes/consultar-clientes.component';
import { EditarClientesComponent } from './components/pages/editar-clientes/editar-clientes.component';

export const routes: Routes = [
    {
        path: 'pages/cadastrar-clientes',
        component: CadastrarClientesComponent
    },

    {
        path: 'pages/consultar-clientes',
        component: ConsultarClientesComponent
    },
    {
        path: 'pages/editar-clientes/:id',
        component: EditarClientesComponent
    },
    {
        path: '', pathMatch : 'full',
        redirectTo: 'pages/consultar-clientes'
    }
];