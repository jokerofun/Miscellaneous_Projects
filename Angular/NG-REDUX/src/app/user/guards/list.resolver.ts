import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { mapTo, tap } from 'rxjs/operators';
import { UserService } from '../user.service';
import { Store } from '@ngrx/store';
import { IAppState } from 'src/app/+store';

@Injectable()
export class ListResolver implements Resolve<Observable<boolean>> {

    constructor(private userService: UserService, private store: Store<IAppState>){ }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.userService.load().pipe(tap(users => {
            this.store.dispatch({ type: 'LOAD_USERS_SUCCESS', payload: users })
        }), mapTo(true));
    }
}
