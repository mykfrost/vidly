import { times } from 'lodash';
import React, { Component } from 'react';
import Like from './common/like';


class MoviesTable extends Component {
    raiseSort = path => {
             // Sorting in descending order
             const sortColumn = {...this.props.sortColumn};
             if(sortColumn.path === path)
             sortColumn.order = (sortColumn.order === 'asc') ? 'desc' : 'asc';
             else {
                 //sort column set to the new path
                 sortColumn.path = path ;
                 //and sort order should always be ascending whenever we sort on a new column
                 sortColumn.order = 'asc';
             }
             // this.setState({sortColumn : {path: path , order :'asc'} });
             //Finally update the state based on this new sort order
             //Raise the sort event 
             this.props.onSort(sortColumn);
    };
    render() { 
        const {movies , onDelete , onLike} = this.props;
        return (          
            <table className="table">
                        <thead>
                            <tr>
                                <th style={{cursor : 'pointer'}}  onClick={ () => this.raiseSort('title')}>Title</th>
                                <th style={{cursor : 'pointer'}}  onClick={ () => this.raiseSort('genre.name') }>Genre</th>
                                <th style={{cursor : 'pointer'}}  onClick={ () => this.raiseSort('numberInStock') } >Stock</th>
                                <th style={{cursor : 'pointer'}} onClick={ () => this.raiseSort('dailyRentalRate') }>Rate</th>
                                <th ></th>
                                <th></th>
                            </tr>
                        </thead>
                            <tbody>
                                {movies.map(movie => (
                                    <tr key={movie._id}>
                                    <td>{movie.title}</td>
                                    <td>{movie.genre.name}</td>
                                    <td>{movie.numberInStock}</td>
                                    <td>{movie.dailyRentalRate}</td>
                                    <td><Like liked={movie.liked} onClick={ () => onLike(movie)}/></td>
                                    <td><button onClick={ () =>  onDelete(movie)} className="btn btn-danger btn-sm">Delete</button></td>
                                   </tr> ))}
                                
                            </tbody>
                       
            </table>       
        );
    }
}
 export default MoviesTable;