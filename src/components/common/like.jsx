import React, { Component } from 'react';

//input : liked :boolean
//Output: Onclick

const Liked = (props) => {

    let classes = 'fa fa-heart';
    if(!props.liked) classes+= '-o';
    return (
        <i style={{cursor : 'pointer'}} onClick={props.onClick} className={classes} aria-hidden="true"></i>
    );
};
 
 
export default Like;