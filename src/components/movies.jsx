import React, { Component } from 'react';
import { deleteMovie, getMovies } from '../services/movieService';
import {  getGenres } from '../services/genreService';
import  _  from 'lodash';
import {toast} from 'react-toastify';
import Pagination from './common/pagination';
import { paginate } from '../utils/paginate';
import ListGroup from './common/listGroup';
import MoviesTable from './moviesTable';
import { Link } from 'react-router-dom';
import SearchBox from './common/searchbox';

class Movies extends Component {
    state = { 
        movies : [],
         genres: [],
        pageSize: 4 ,
        currentPage: 1,
        searchQuery: "",
        selectedGenre: null,
        sortColumn: {path : 'title' , order: 'asc'}
    };
    //rendered when rendering is done
    async componentDidMount(){
        const {data} = await getGenres();
        const genres = [{_id: '' , name : 'All Genres'} , ...data];

        const {data : movies} = await  getMovies();
        this.setState({movies, genres });
    }

    handleDelete = async movie =>{
        const originalMovies = this.state.movies;

        const movies = originalMovies.filter(m => m._id !== movie._id );
        // this.setState({movies : movies}); long method

        this.setState({movies});//short method
        try{
        await deleteMovie(movie._id);
        }catch(ex){
            if(ex.response && ex.response.status === 404)
            toast.error('This movie has already been deleted');

            this.setState({movies : originalMovies});
        }
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
       this.setState({selectedGenre: genre ,searchQuery: "", currentPage: 1});
    };
    handleSort = sortColumn => {
        // console.log(path);
   
        this.setState({sortColumn});
    };
    getPageData =()=>{
        const {pageSize ,sortColumn, currentPage ,selectedGenre,searchQuery, movies : allMovies} = this.state;
            //if count is not zero
        //Before pagination we need to do filtering coz pagination depends on page size from filters
        let filtered = allMovies;
        if(searchQuery)
        filtered = allMovies.filter(m => m.title.toLowerCase().startsWith(searchQuery.toLocaleLowerCase()));
        else if  (selectedGenre && selectedGenre._id) 
        filtered = allMovies.filter(m => m.genre._id === selectedGenre._id);

        
         //Sorting has to be done after doing filtering.
        //pass the filtered movies to the lodash sort array
        const sorted = _.orderBy(filtered , [sortColumn.path] , [sortColumn.order]);
        // const movies = paginate(filtered , currentPage, pageSize);
        const movies = paginate(sorted , currentPage, pageSize);
        return {totalCount : filtered.length , data : movies};
    };
    handleSearch = query =>{
        this.setState({searchQuery: query , selectedGenre :null , currentPage : 1});
    };
    render() { 

        const {length : count} = this.state.movies;
        const {pageSize ,sortColumn,searchQuery, currentPage } = this.state;

        if(count === 0) return <p>There are no movies in the database</p>;
         const {totalCount , data : movies} = this.getPageData();
        return (
        <div className='row'>       
         <div className="col-3">        
        <ListGroup onItemSelect={this.handleGenreSelect} selectedItem={this.state.selectedGenre}
        items={this.state.genres} > 
        </ListGroup>
        </div>

        <div className="col">
            <Link
            to="/movies/new"
            className="btn btn-primary"
            style={{marginBottom :20}}
            >
                New Movie
            </Link>
        <p>Showing {totalCount} movies in the database</p>
        <SearchBox value={searchQuery} onChange={this.handleSearch}/>
        <MoviesTable  movies={movies}  sortColumn={sortColumn} onLike={this.handleLike}
        onDelete={this.handleDelete}
        onSort={this.handleSort} > 
        </MoviesTable>       
        
        <Pagination itemsCount={totalCount}  pageSize={pageSize}  currentPage={currentPage}
         onPageChange={this.handlePageChange}> 
         </Pagination>
         </div>
                
        </div>
        );
        
    };
}

export default Movies;