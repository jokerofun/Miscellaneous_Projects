import { ActionReducerMap } from '@ngrx/store';
import { reducer, IState } from './reducer';

export interface IAppState {
    app: IState;
}

export const reducers: ActionReducerMap<IAppState> = { app: reducer }