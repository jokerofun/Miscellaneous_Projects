import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ListComponent } from './list/list.component';
import { UserRoutingModule } from './user-routing.module';
import { UserService } from './user.service';
import { ListResolver } from './guards/list.resolver';
import { StoreModule } from '@ngrx/store';
import { reducers } from './+store';

@NgModule({
  declarations: [ListComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    HttpClientModule,
    StoreModule.forFeature('user', reducers)
  ],
  providers: [
    UserService,
    ListResolver
  ]
})
export class UserModule { }
