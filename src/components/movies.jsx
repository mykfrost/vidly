import React, { Component } from 'react';
import { getMovies } from '../services/fakeMovieService';
import { genres, getGenres } from '../services/fakeGenreService';
import Like from './common/like';
import Pagination from './common/pagination';
import { paginate } from '../utils/paginate';
import ListGroup from './common/listGroup';

class Movies extends Component {
    state = { 
        movies : [],
        pageSize: 4 ,
        currentPage: 1,
       genres: []

    };
    //rendered when rendering is done
    componentDidMount(){
        this.setState({movies : getMovies() , genres : getGenres()});
    }
    handleDelete = movie =>{
        const movies = this.state.movies.filter(m => m._id !== movie._id );
        // this.setState({movies : movies}); long method

        this.setState({movies});//short method
        //console.log(movie);
    };

    handleLike = movie =>{
        const movies = [...this.state.movies];
       const  index =  movies.indexOf(movie);
       movies[index] = {...movies[index]};
        movies[index].liked = !movies[index].liked;
        this.setState({movies});
        
    };

    handlePageChange = page =>{
        this.setState({currentPage: page});
    };
   
    handleGenreSelect = genre =>{
       this.setState({selectedGenre: genre});
    };

    render() { 

        const {length : count} = this.state.movies;
        const {pageSize , currentPage , movies : allMovies} = this.state;

        if(count === 0) 
            return <p>There are no movies in the database</p>;
            //if count is not zero

        const movies = paginate(allMovies , currentPage, pageSize);
        return (
            <div className='row'>

                <div className="col-3">
                    {/* Define the interfce of this component */}
                    <ListGroup 
                     onItemSelect={this.handleGenreSelect}
                     selectedItem={this.state.selectedGenre}
                     items={this.state.genres}
                     
                     ></ListGroup>
                </div>
                <div className="col">
                <p>Showing {count} movies in the database</p>
                <table className="table">
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Genre</th>
                    <th>Stock</th>
                    <th>Rate</th>
                    <th></th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                    {movies.map(movie =>(
                        <tr key={movie._id}>
                        <td>{movie.title}</td>
                        <td>{movie.genre.name}</td>
                        <td>{movie.numberInStock}</td>
                        <td>{movie.dailyRentalRate}</td>
                        <td><Like liked={movie.liked} onClick={() => this.handleLike(movie)}/></td>
                        <td><button onClick={ () => this.handleDelete(movie)} className="btn btn-danger btn-sm">Delete</button></td>
                    </tr> ))}
                    
                </tbody>
           
        </table>
        {/* <Pagination itemsCount={this.state.movies.length}/> */}
        <Pagination 
        itemsCount={count} 
         pageSize={pageSize}
         currentPage={currentPage}
         onPageChange={this.handlePageChange}/>
       

                </div>
                
        </div>
        
        );}
}

export default Movies;