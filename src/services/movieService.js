import http from "./httpService";
import config from '../config.json';

const apiEndPoint = config.apiUrl + "/movies";

 function getMovieUrl(id){
     
     return `${apiEndPoint}/${id}`;

    }

export function getMovies(){

     return http.get(apiEndPoint);
}



export function getMovie(movieId){

     return http.get(getMovieUrl(movieId));
}

export function saveMovie(movie){
    
    if(movie._id){
     const body = {...movie};
    delete body._id;
       return http.put(getMovieUrl(movie._id), body);
    }

    return http.post(apiEndPoint , movie);
   //  return http.get(apiEndPoint);
}
export function deleteMovie(movieId){
    return http.delete(getMovieUrl(movieId));
}
