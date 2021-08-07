import React, { Component } from 'react';
import requester from '../../infrastructure/requester';
import observer from '../../infrastructure/observer';

export default class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username:'',
            password:''
        }
    }

    handleChange = ev => {
        let fieldName = ev.target.name;
        let fieldValue = ev.target.value;

        this.setState({ [fieldName]: fieldValue });
    }

    handleSubmit = ev => {
        ev.preventDefault();

        requester.post('user', 'login', 'basic', this.state)
        .then(res => {
            observer.trigger(observer.events.loginUser, res.username);
            observer.trigger(observer.events.notification, { type: 'success', message: "Success."});
            sessionStorage.setItem('authtoken', res._kmd.authtoken);
            this.props.history.push('/catalog')
        })
        .catch(res => {
            observer.trigger(observer.events.notification, {
                type: 'error',
                message: res.responseJSON.description
            });

            this.setState({ username: '', password: ''});
        });
            
    }

    render = () => {
        return (
            <form id="loginForm" onSubmit={this.handleSubmit}>
                <h2>Sign In</h2>
                <label>Username:</label>
                <input name="username" onChange={this.handleChange} type="text" value={this.state.username} />
                <label>Password:</label>
                <input name="password" onChange={this.handleChange} type="password" value={this.state.password} />
                <input id="btnLogin" type="submit" value="Sign In" />
            </form>

        )
    }
}