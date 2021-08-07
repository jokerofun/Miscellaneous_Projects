import { Component, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { IAppState } from '../+store';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnDestroy {
  counter: number;
  subscription: Subscription;

  constructor(private store: Store<IAppState>) {
    this.subscription = store.select((state) => state.app.counter).subscribe(counterValue => {
      this.counter = counterValue;
    });
  }

  increment() {
    this.store.dispatch({ type: 'INC' });
  }

  decrement() {
    this.store.dispatch({ type: 'DEC' });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
