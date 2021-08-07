import React from 'react';

const getBookData = (id) => {
    const books = [
        {
            abc: {
                title: 'Lotr',
                author: 'Tolkien',
                publishDate: '1964'
            }
        }
    ];
    const book = books.find(book => book.hasOwnProperty(id))[id];

    return Promise.resolve(book);
}

class Book extends React.Component {
    state= {
        author:'',
        title:'',
        publishDate:''
    }


    render () {
        const { author, title, publishDate} = this.state;

        return (
            <div>
                Author: <span>{author}</span>
                Title: <span>{title}</span>
                Publish Date: <span>{publishDate}</span>
            </div>
        );
    }

    async componentDidMount() {
        const id = this.props.match.params.id;
        const data = await getBookData(id);

        this.setState(data);

    }
    
}

export default Book;