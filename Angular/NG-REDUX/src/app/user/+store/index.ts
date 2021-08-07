import { IAppState } from '../../+store';
import { reducer } from './reducer';



interface IAppUserState extends IAppState {
    user: {entities: any[] };
}

export const reducers = {
    list: reducer
};