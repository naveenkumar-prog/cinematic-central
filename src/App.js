import { BrowserRouter,Route,Routes} from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header';
import SimpleBottomNavigation from './components/MainNav';
import { Container } from '@mui/material';
import Trending from './Pages/Trending/Trending';
import Search from './Pages/Search/Search';
import Series from './Pages/Series/Series';
import Movies from './Pages/Movies/Movies';


function App() {
  return (
    <BrowserRouter>
    <Header/>
    <div className="app">
      <Container>
        <Routes>
          <Route path="/" element={<Trending/>} exact></Route>
          <Route path='/movies' element={<Movies/>}></Route>
          <Route path='/series' element={<Series/>}></Route>
          <Route path='/search' element={<Search/>}></Route>
        </Routes>
      </Container>
    </div>
    <SimpleBottomNavigation/>
    </BrowserRouter>
  );
}

export default App;
