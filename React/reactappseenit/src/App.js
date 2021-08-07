import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import './App.css';
import './styles/site.css';

import Header from './components/common/header';
import Home from './components/home/Home';
import Notification from './components/common/Notification';
import Catalog from './components/catalog/Catalog';
import Logout from './components/user/Logout';

class App extends Component {
  render() {
    return (
      <div className="App">
      <main className="content"></main>
        <Header />
        <Notification />
        <Route path='/' exact component={Home} />
        <Route path='/catalog' component={Catalog} />
        <Route path='/logout' component={Logout} />
      </div>
    );
  }
}

export default App;
