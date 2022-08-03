import './App.css';
import { Route, Switch ,Redirect } from 'react-router-dom';
import {getMovies} from '../src/services/fakeMovieService';
import Movies from './components/movies';
import Rentals from './components/rentals';
import NotFound from './components/notFound';
import Customers from './components/customers';
function App() {
  return (
   <main className='container'>
        <Switch>
        <Route path="/movies" component={Movies} ></Route>
        <Route  path="/customers" component={Customers}></Route>
        <Route  path="/rentals" component={Rentals}></Route>
        <Route  path="/not-found" component={NotFound}></Route>
        <Redirect exact from="/" to="/movies"/>
        <Redirect to="not-found" component={NotFound}/>
        </Switch>
   </main>
  );
}

export default App;
