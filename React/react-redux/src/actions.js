import store from './index';
import { ADD_ITEM } from './constants';

export const addItemAction = () => {
    store.dispatch({
      type: ADD_ITEM
    });
  }

export const removeItemAction = () => {
    store.dispatch({
      type: 'REMOVE_ITEM'
    });
  }