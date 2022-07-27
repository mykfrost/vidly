import './App.css';
import {getMovies} from '../src/services/fakeMovieService';
import Movies from './components/movies';
function App() {
  return (
   <main className='container'>
   
    <Movies></Movies>
   
   </main>
  );
}

export default App;
