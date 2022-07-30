import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { genres, getGenres } from '../../services/fakeGenreService';

class ListGroup extends Component {
    state = { 
       genres: getGenres(),
       
    };

     
 render(){
    const {length : count} = this.state.genres;
  


   // const genres = paginate(allMovies , currentPage, pageSize);
    return (
        <nav>
        <ul className="list-group">
            {count.map(genre =>(
             <li  className="list-group-item">{genre}</li>
            ))}    
         </ul>
    </nav>
          );}
}
export default ListGroup;


