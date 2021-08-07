import React, {Fragment, Component} from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';
import Home from './components/views/home';
import About from './components/views/about';
import Books from './components/views/books';
import Book from './components/views/book';
import './index.css';

const NavBar = () => {
    return (
        <header>
        <nav>
            <ul>
                <li>
                    <Link to="/about">About</Link>
                    <Link to="/">Home</Link>
                    <Link to="/foo">foo</Link>
                </li>
            </ul>
        </nav>
    </header>
    );
};

const NotFound = () => {
    return (
        <div>
            <h1>Not Found</h1>
        </div>
    )
}

class AppWrapper extends Component {
    render() {
        return (
            <Fragment>
                <Router>
                    <Fragment>
                        <NavBar />
                        <Switch>
                            <Route path="/" render={() => <Home name="hey" />} component={Home} exact />
                            <Route path="/about" component={About} />
                            <Route path="/books" component={Books} exact />
                            <Route component={NotFound} />
                        </Switch>
                    </Fragment>
                </Router>
            </Fragment>
            
        )
    }
};

ReactDOM.render(
<AppWrapper />,
document.getElementById('root')
);