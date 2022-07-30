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
    handleSort = path => {
        // console.log(path);
        // Sorting in descending order
        const sortColumn = {...this.state.sortColumn};
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
        this.setState({sortColumn});
    };
    render() { 

        const {length : count} = this.state.movies;
        const {pageSize ,sortColumn, currentPage ,selectedGenre, movies : allMovies} = this.state;

        if(count === 0) 
        return <p>There are no movies in the database</p>;
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
        <p>Showing {filtered.length} movies in the database</p>
        <MoviesTable 
        onSort={this.handleSort}
        movies={movies}
        onDelete={this.handleDelete}
        onLike={this.handleLike}
        ></MoviesTable>       
        {/* <Pagination itemsCount={this.state.movies.length}/> */}
        <Pagination 
         itemsCount={filtered.length} 
         pageSize={pageSize}
         currentPage={currentPage}
         onPageChange={this.handlePageChange}/>
       

        </div>
                
        </div>
        
        );}
}

export default Movies;