import React, { Component } from 'react';
import { getMovies } from '../services/fakeMovieService';
import { genres, getGenres } from '../services/fakeGenreService';
import  _  from 'lodash';
import Pagination from './common/pagination';
import { paginate } from '../utils/paginate';
import ListGroup from './common/listGroup';
import MoviesTable from './moviesTable';

class Movies extends Component {
    state = { 
        movies : [],
        pageSize: 4 ,
        currentPage: 1,
        genres: [],
        sortColumn: {path : 'title' , order: 'asc'}
    };
    //rendered when rendering is done
    componentDidMount(){
        const genres = [{_id: '' , name : 'All Genres'} , ...getGenres()];
        this.setState({movies : getMovies() , genres });
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
       this.setState({selectedGenre: genre , currentPage: 1});
    };
    handleSort = sortColumn => {
        // console.log(path);
   
        this.setState({sortColumn});
    };
    getPageData =()=>{
        const {pageSize ,sortColumn, currentPage ,selectedGenre, movies : allMovies} = this.state;
            //if count is not zero
        //Before pagination we need to do filtering coz pagination depends on page size from filters
        const filtered =  selectedGenre && selectedGenre._id 
        ? allMovies.filter(m => m.genre._id === selectedGenre._id)
         : allMovies;
         //Sorting has to be done after doing filtering.
        //pass the filtered movies to the lodash sort array
        const sorted = _.orderBy(filtered , [sortColumn.path] , [sortColumn.order])
        // const movies = paginate(filtered , currentPage, pageSize);
        const movies = paginate(sorted , currentPage, pageSize);
        return {totalCount : filtered.length , data : movies}
    };
    render() { 

        const {length : count} = this.state.movies;
        const {pageSize ,sortColumn, currentPage } = this.state;

        if(count === 0) return <p>There are no movies in the database</p>;
         const {totalCount , data : movies} = this.getPageData();
        return (
        <div className='row'>       
         <div className="col-3">
         {/* Define the interfce of this component */}
        <ListGroup                      
        onItemSelect={this.handleGenreSelect}
        selectedItem={this.state.selectedGenre}
        items={this.state.genres}/ >
        </div>
        <div className="col">
        <p>Showing {totalCount} movies in the database</p>
        <MoviesTable     
        movies={movies} 
        sortColumn={sortColumn}      
        onLike={this.handleLike}
        onDelete={this.handleDelete}
        onSort={this.handleSort} />       
        {/* <Pagination itemsCount={this.state.movies.length}/> */}
        <Pagination 
         itemsCount={totalCount} 
         pageSize={pageSize}
         currentPage={currentPage}
         onPageChange={this.handlePageChange}/>
         </div>
                
        </div>
        
        );
    }
}

export default Movies;