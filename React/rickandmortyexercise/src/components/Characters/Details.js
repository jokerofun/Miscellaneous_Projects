import React from 'react';

export default class Details extends React.Component {
    render = () => {
        
        return this.props.bio && (
            <section id="bio">
                <div className="image">
                    <img src={this.props.url}/>
                </div>
                <div className="info">
                    <p>Name: <strong>{this.props.name}</strong></p>
                    <p>Bio: {this.props.bio}</p>
                    <p></p>
                </div>
            </section>
        )
    }
}