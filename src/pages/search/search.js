import { useState } from "react";
import TextField from '@mui/material/TextField';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import './search.css'
import { Button } from "@mui/base";
import SearchIcon from '@mui/icons-material/Search';
import ClearAllIcon from '@mui/icons-material/ClearAll';
import axios from "axios";
import MovieCard from "../../components/MovieCard/movieCard";


const theme = createTheme({
  palette: {
    primary: {
      main: '#fff',
    },
  },
});



const Search = () => {
    const [query, setQueryText] = useState("");
    const [content, setContent] = useState(); 
    const getSearch = async() =>{
        const {data} = await axios.get(`https://api.themoviedb.org/3/search/multi?api_key=1b3d13704eedfdbecf045cc5f3f964c5&language=en-US&query=${query}&page=1&include_adult=false`
        );
        setContent(data.results);
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Enter') {
        getSearch();
      }
    }

    const clearSearch = () => {
      setQueryText("");
      setContent(null);
    }

    return (
        <div>
            <span className="PageTitle">Search Content</span>
            <ThemeProvider theme={theme}>
                <div className="search">
                <TextField 
                    style={{flex:1}}
                    className="searchBox"
                    id="outlined-basic" 
                    label="Search Movies" 
                    variant="filled" 
                    value={query}
                    onChange={(e) => setQueryText(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
                <Button className="searchButton" variant='contained' style={{marginLeft: 10}} onClick={getSearch}><SearchIcon/></Button>
                <Button className="clearButton" variant='contained' style={{marginLeft: 10}} onClick={clearSearch}><ClearAllIcon/></Button>
                </div>
            </ThemeProvider>
            <div className="trending">
                {content && content.map((con) => (
                    <MovieCard 
                    key={con.id} 
                    id={con.id} 
                    poster={con.poster_path} 
                    title={con.title || con.name} 
                    date={con.release_date || con.first_air_date}
                    mediaType={con.media_type}
                    rating={con.vote_average}
                    />
                ))}
                { query && !content && (<h2>No Data Found!</h2>)}
            </div>            
        </div>

    )
}

export default Search;
