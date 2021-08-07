import React from 'react';

export default class Roster extends React.Component {
    constructor(props){
        super(props);
    }

    render = () => {
        const images = this.props.images.map(i => (
            <div key={i.id} className="roster-image-container">
        <img src={i.url} alt="nqkyv alt" onClick={() => this.props.select(i.id)} />
            </div>
        ));
        return (
            <section id="roster">
                {images}
            </section>
        )
    }
}