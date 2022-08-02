import React, { Component } from 'react';
import Like from './common/like';
import TableBody from './common/tableBody';
import TableHeader from './common/tableHeader';


class MoviesTable extends Component {
        columns =[
            {path : 'title', label : 'Title'},
            {path : 'genre.name', label : 'Genre'},
            {path : 'numberInStock', label : 'Stock'},
            {path : 'DailyRentalRate', label : 'Rate'},
            {
                key : 'like',
                content: <Like liked={movie.liked} onClick={ () => onLike(movie)}/>},
            {key :'delete',
           content : <button onClick={ () =>  onDelete(movie)} className="btn btn-danger btn-sm">Delete</button> }
        ]
    render() { 
        const {movies , onDelete , onLike ,onSort,sortColumn} = this.props;
        return (          
            <table className="table">
                        <TableHeader 
                        columns={this.columns} 
                        sortColumn={sortColumn}
                        onSort={onSort}
                        >
                        </TableHeader>
                        <TableBody
                        columns={this.columns}
                        data ={movies}
                        >

                        </TableBody>
                            {/* <tbody>
                                {movies.map(movie => (
                                    <tr key={movie._id}>
                                    <td>{movie.title}</td>
                                    <td>{movie.genre.name}</td>
                                    <td>{movie.numberInStock}</td>
                                    <td>{movie.dailyRentalRate}</td>
                                    <td><Like liked={movie.liked} onClick={ () => onLike(movie)}/></td>
                                    <td><button onClick={ () =>  onDelete(movie)} className="btn btn-danger btn-sm">Delete</button></td>
                                   </tr> ))}
                                
                            </tbody> */}
                       
            </table>       
        );
    }
}
 export default MoviesTable;