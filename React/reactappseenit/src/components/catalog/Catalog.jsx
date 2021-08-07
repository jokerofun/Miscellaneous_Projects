import React, {Component} from 'react';
import Navigation from '../common/Navigation';
import PostsList from '../post/PostsList';

export default class Catalog extends Component {
    render = () => {
        return (
            <div>
                <Navigation />
                <PostsList />
            </div>
        )
    }
}