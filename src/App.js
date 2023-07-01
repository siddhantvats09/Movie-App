import { BrowserRouter,Route,Routes } from 'react-router-dom';
import './App.css';
import Header from "./components/header/Header"
import SimpleBottomNavigation from "./components/Mainnav"
import { Container } from '@mui/material';
import Tranding from "./pages/Tranding"
import Movies from "./pages/Movies"
import Series from "./pages/Series"
import Search from "./pages/Search"
import Developer from "./pages/Developer"

function App() {
  return (
 <BrowserRouter>
       <Header/>
     <div className="app">
       <Container className='e'>
        <Routes>
          <Route path="/" element={<Tranding/>} />
          <Route path="/movies" element={<Movies/>}/>
          <Route path="/series" element={<Series/>}/>
          <Route path="/search" element={<Search/>}/>
          <Route path="/developer" element={<Developer/>}/>
        </Routes>
       </Container>
    </div>
       <SimpleBottomNavigation/>
 </BrowserRouter>
  );
}

export default App;
