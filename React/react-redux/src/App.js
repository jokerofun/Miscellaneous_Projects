import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import logo from './logo.svg';
import './App.css';
import { connect } from 'react-redux';
import { addItemAction, removeItemAction } from './actions';


class App extends Component {
  constructor(props){
    super(props);

    console.log(props);
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title"></h1>
        </header>
        <button onClick={this.props.addItem}>Add Item</button>
        <button onClick={this.props.removeItem}>Remove Item</button>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  addItem: dispatch(addItemAction),
  removeItem: dispatch(removeItemAction)
});

const mapStateToProps = state => ({
  arrayItems: state
});

export default connect(mapStateToProps, mapDispatchToProps) (App);
