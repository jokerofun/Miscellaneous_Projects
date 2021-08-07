import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { ADD_ITEM } from './constants';


const initialStore = ["TEST"];
const reducer = (state, action) => {
    if(action.type === ADD_ITEM){
      return state.concat([` !!! ${state.length} ~~~~ `]);
    }
    else if(action.type === 'REMOVE ITEM'){
        return state.slice(0, -1);
    }
    return state;
  }

const store = createStore(reducer, initialStore, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
const ADD_ITEM = 'ADD_ITEM';

store.subscribe(() => { 
    console.log('SUBSCRIPTION TO CHANGE: ==> ', store.getState());
    ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
});


ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));

export default store;
