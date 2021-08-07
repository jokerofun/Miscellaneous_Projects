import React from 'react';
import { Route } from 'react-router-dom';

const Contact = () => {
    return (
        <div>
            This is the contacts page
        </div>
    );
};

const AboutContent = () => {
    return(
        <h1>This is the About page!</h1>
    );
};

const About = (props) => {
    const { path } = props.match;

    return (
        <div>
            <Route path={`${path}`} component={AboutContent} />
            <Route path={`${path}/contact`} component={Contact} />
        </div>
    );
};

export default About;