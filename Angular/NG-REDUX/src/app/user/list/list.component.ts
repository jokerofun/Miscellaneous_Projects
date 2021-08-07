import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { IAppState } from 'src/app/+store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  users$: Observable<any[]>;

  constructor(private store: Store<any>) { 
    this.users$ = store.select((state) => state.user.list.entities);
  }

  ngOnInit() {
  }

  deleteHandler(userId) {
    this.store.dispatch({ type: 'DELETE_USER', payload: userId });
  }

}
