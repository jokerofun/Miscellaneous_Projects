import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FurnitureAllComponent } from '../furniture-all/furniture-all.component';
import { CreateFurnitureComponent } from '../create-furniture/create-furniture.component';
import { FurnitureDetailsComponent } from '../furniture-details/furniture-details.component';
import { FurnitureUserComponent } from '../furniture-user/furniture-user.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FurnitureService } from '../furniture.service';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    FurnitureAllComponent,
    CreateFurnitureComponent,
    FurnitureDetailsComponent,
    FurnitureUserComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', redirectTo: 'home' },
      { path: 'create', component: CreateFurnitureComponent},
      { path: 'all', component: FurnitureAllComponent},
      { path: 'details/:id', component: FurnitureDetailsComponent},
      { path: 'user', component: FurnitureUserComponent}
    ])
  ],
  providers: [
    FurnitureService
  ]
})
export class FurnitureModule { }
