import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { genres, getGenres } from '../../services/fakeGenreService';

const ListGroup = props =>{

    const {items , textProperty , valueProperty ,onItemSelect ,selectedItem } = props;

  return <ul className="list-group">
          
            {items.map( item =>
           <li  style={{cursor : 'pointer'}} 
            key={item[valueProperty]}
            onClick={() => onItemSelect(item)}
            className={ item === selectedItem ?'list-group-item active' : 'list-group-item'}>
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


