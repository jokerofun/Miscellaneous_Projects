import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './list/list.component';
import { ListResolver } from './guards/list.resolver';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'list'
    },
    {
        path: 'list',
        component: ListComponent,
        resolve: [ListResolver]
    }
];

export const UserRoutingModule = RouterModule.forChild();