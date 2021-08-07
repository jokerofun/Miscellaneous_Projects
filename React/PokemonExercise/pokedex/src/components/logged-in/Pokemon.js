import React, { Component } from 'react';

const Pokemon = (props) => (
    <div>
        <h1>{props.item.pokemonName}</h1>
        <p>{props.item.pokemonInfo}</p>
        <img src={props.item.pokemonInfo} alt={props.item.pokemonInfo}></img>
    </div>
);

export default Pokemon;