import {BrowserRouter, Route, Routes} from "react-router-dom";
import { Container } from '@mui/material';
import './App.css';
import Header from './components/header/header';
import SimpleBottomNavigation from './components/mainNav';
import Trending from "./pages/trending/trending";
import Movies from "./pages/movies/movies";
import Series from "./pages/series/series";
import Search from "./pages/search/search";
import Saved from "./pages/saved/saved";

function App() {
  return (
    <BrowserRouter>
      <Header></Header>
      <div className="app">
      <Container>
        <Routes>
          <Route path="/" Component={Trending} exact></Route>
          <Route path="/movies" Component={Movies}></Route>
          <Route path="/series" Component={Series}></Route>
          <Route path="/search" Component={Search}></Route>
          <Route path="/saved" Component={Saved}></Route>

        </Routes>
      </Container>

      </div>

      <SimpleBottomNavigation></SimpleBottomNavigation>
    </BrowserRouter>
  );
}

export default App;
