import React, { Component } from 'react';
import Like from './common/like';
import TableHeader from './common/tableHeader';


class MoviesTable extends Component {
        columns =[
            {path : 'title', label : 'Title'},
            {path : 'genre.name', label : 'Genre'},
            {path : 'numberInStock', label : 'Stock'},
            {path : 'DailyRentalRate', label : 'Rate'},
            {key : 'like'},
            {key :'delete'}
        ]
    render() { 
        const {movies , onDelete , onLike ,onSort,sortColumn} = this.props;
        return (          
            <table className="table">
                        <TableHeader columns={this.columns} 
                        sortColumn={sortColumn}
                        onSort={onSort}
                        >
                            <tr>
                                <th style={{cursor : 'pointer'}}  onClick={ () => this.raiseSort('title')}>Title</th>
                                <th style={{cursor : 'pointer'}}  onClick={ () => this.raiseSort('genre.name') }>Genre</th>
                                <th style={{cursor : 'pointer'}}  onClick={ () => this.raiseSort('numberInStock') } >Stock</th>
                                <th style={{cursor : 'pointer'}} onClick={ () => this.raiseSort('dailyRentalRate') }>Rate</th>
                                <th ></th>
                                <th></th>
                            </tr>
                        </TableHeader>
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