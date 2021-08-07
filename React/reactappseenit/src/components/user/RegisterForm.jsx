import React, { Component } from 'react';
import requester from '../../infrastructure/requester';
import observer from '../../infrastructure/observer';

export default class RegisterForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username:null,
            password:null
        }
    }

    handleChange = ev => {
        let fieldName = ev.target.name;
        let fieldValue = ev.target.value;

        this.setState({ [fieldName]: fieldValue });
    }

    handleSubmit = ev => {
        ev.preventDefault();

        requester.post('user', '', 'basic', this.state)
        .then(res => {
            observer.trigger(observer.events.loginUser,res.username);
            sessionStorage.setItem('authtoken', res._kmd.authtoken);
        });
    }

    render = () => {
        return (
            <form id="registerForm" onClick={this.handleSubmit}>
                        <h2>Register</h2>
                        <label>Username:</label>
                        <input name="username" type="text" onChange={this.handleChange} />
                        <label>Password:</label>
                        <input name="password" type="password" onChange={this.handleChange} />
                        <label>Repeat Password:</label>
                        <input name="repeatPass" type="password" onChange={this.handleChange} />
                        <input id="btnRegister" type="submit" value="Sign Up" />
                    </form>


        )
    }
}