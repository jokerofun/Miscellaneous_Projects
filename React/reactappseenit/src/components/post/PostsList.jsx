import React, {Component} from 'react';
import requester from '../../infrastructure/requester';
import Post from './Post';
import '../../styles/post.css';

export default class PostsList extends Component {
    constructor(props){
        super(props);
        this.state = { posts: []}
    }

    getPosts = () =>
    requester.get('appdata', 'posts', 'kinvey')
    .then(res => {
        this.setState(prevState => {
            let newState = prevState
            newState.push(res);
            return newState;
        })
    });

    componentDidMount = () => this.getPosts();

    render = () => (
        <section id="viewCatalog">
                {this.state.posts.map((p,i) => <Post key={p._id} index={i} {...p} />)}
        </section>
    )
}