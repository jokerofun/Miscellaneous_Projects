import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateFurnitureComponent } from './furniture/create-furniture/create-furniture.component';
import { FurnitureAllComponent } from './furniture/furniture-all/furniture-all.component';
import { FurnitureDetailsComponent } from './furniture/furniture-details/furniture-details.component';
import { FurnitureUserComponent } from './furniture/furniture-user/furniture-user.component';

const routes: Routes = [
  {path: 'furniture', loadChildren: './furniture/furniture/furniture.module#FurnitureModule', canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
