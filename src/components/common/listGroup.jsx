import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { genres, getGenres } from '../../services/fakeGenreService';

const ListGroup = props =>{

    const {items , textProperty , valueProperty} = props;

  return <ul className="list-group">
    {items.map( item =>
           <li  style={{cursor : 'pointer'}} 
            key={item[valueProperty]}
            
            className="list-group-item">
            {item[textProperty]}
            </li>
        )};
 
  </ul>;


}

ListGroup.defaultProps ={
    textProperty : 'name',
    valueProperty : '_id'
   };

export default ListGroup;


