import { Route, Switch ,Redirect } from 'react-router-dom';
import React,{Component } from 'react';
import {getMovies} from '../src/services/fakeMovieService';
import Movies from './components/movies';
import LoginForm from './components/loginForm';
import MovieForm from './components/movieForm';
import Rentals from './components/rentals';
import NotFound from './components/notFound';
import Customers from './components/customers';
import NavBar from './components/navBar';
import './App.css';

function App() {
  return (
  <React.Fragment>
    <NavBar/>
   <main className='container'>
        <Switch>
        <Route path="/login" component={LoginForm} />
        <Route path="/movies/:id" component={MovieForm} />
        <Route path="/movies" component={Movies} ></Route>
        <Route  path="/customers" component={Customers}></Route>
        <Route  path="/rentals" component={Rentals}></Route>
        <Route  path="/not-found" component={NotFound}></Route>
        <Redirect exact from="/" to="/movies"/>
        <Redirect to="not-found" />
        </Switch>
   </main>
   </React.Fragment>
  );
}

export default App;
