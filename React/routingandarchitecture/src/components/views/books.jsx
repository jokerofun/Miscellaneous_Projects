import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Book from './book';

const BooksList = ({books}) => {
    return (
                <ul>
                    {
                        books.map(({id,title}) => (<li key={id}>{title}</li>))
                    }
                </ul>
    );
}

class Books extends React.Component {
    state = {
        books: [
            {id: 'a', title:'LOTR'},
            {id: 'b', title:'HP'},
            {id: 'c', title:'GOT'},
        ]
    };

    render() {
        const { books } = this.state;
        const { path } = this.props.match;

        return (
            <div>
                <aside>
                    Here is an add for you
                </aside>
                <Switch>
                    <Route path={path} render={() => <BooksList books={books} />} exact />
                    <Route path={`${path}/:id`} component={Book} />
                </Switch>
            </div>
        );
    }
}

export default Books;