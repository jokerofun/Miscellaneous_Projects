import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import '../../styles/menu.css';

export default class Navigation extends Component {
    render = () => (
        <div id="menu">
            <div className="title">Navigation</div>
            <NavLink className="nav" to='/' activeClassName="active">Home</NavLink>
            <NavLink className="nav" to='/catalog' activeClassName="active">Catalog</NavLink>
        </div>


    )
}