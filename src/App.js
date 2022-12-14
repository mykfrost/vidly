import { Route, Switch ,Redirect } from 'react-router-dom';
import React from 'react';
import Movies from './components/movies';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoginForm from './components/loginForm';
import RegisterForm from './components/registerForm';
import MovieForm from './components/movieForm';
import Rentals from './components/rentals';
import NotFound from './components/notFound';
import Customers from './components/customers';
import NavBar from './components/navBar';
import './App.css';


function App() {
  return (
  <React.Fragment>
    <ToastContainer/>
    <NavBar/>
   <main className='container'>
        <Switch>
       
        <Route path="/login" component={LoginForm}></Route>
        <Route path="/register" component={RegisterForm}></Route>
        <Route path="/movies/:id" component={MovieForm} ></Route>
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
