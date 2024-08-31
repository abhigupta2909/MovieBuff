import axios from "axios";
import { useEffect, useState } from "react";
import MovieCard from "../../components/MovieCard/movieCard";
import MovieCreationRoundedIcon from '@mui/icons-material/MovieCreationRounded';

const Movies = () =>{
    const [content, setContent] = useState([]);

    const getMovies = async ()=>{
        const {data} = await axios.get("https://api.themoviedb.org/3/discover/movie?api_key=1b3d13704eedfdbecf045cc5f3f964c5&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate");
        setContent(data.results);
    } 

    useEffect(() => {
        getMovies();
    }, []);

    return (
        <div>
            <span className="PageTitle"><span><MovieCreationRoundedIcon></MovieCreationRoundedIcon></span>&nbsp;&nbsp;Movies</span>
            <div className="trending">
                {content && content.map((con) => (
                    <MovieCard 
                    key={con.id} 
                    id={con.id} 
                    poster={con.poster_path} 
                    title={con.title || con.name} 
                    date={con.release_date || con.first_air_date}
                    mediaType={'movie'}
                    rating={con.vote_average}
                    />
                ))}
            </div>
        </div>
    )
}

export default Movies;