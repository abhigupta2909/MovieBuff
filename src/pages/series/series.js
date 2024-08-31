import axios from "axios";
import { useEffect, useState } from "react";
import MovieCard from "../../components/MovieCard/movieCard";
import TvSharpIcon from '@mui/icons-material/TvSharp';

const Series = () =>{
    const [content, setContent] = useState([]);

    const getSeries = async ()=>{
        const {data} = await axios.get("https://api.themoviedb.org/3/discover/tv?api_key=1b3d13704eedfdbecf045cc5f3f964c5&language=en-US&sort_by=popularity.desc&page=1&timezone=America%2FNew_York&include_null_first_air_dates=false&with_status=0&with_type=0");
        setContent(data.results);
    } 

    useEffect(() => {
        getSeries();
    }, []);

    return (
        <div>
            <span className="PageTitle"><span><TvSharpIcon></TvSharpIcon></span>&nbsp;&nbsp;TV Series</span>
            <div className="trending">
                {content && content.map((con) => (
                    <MovieCard 
                    key={con.id} 
                    id={con.id} 
                    poster={con.poster_path} 
                    title={con.title || con.name} 
                    date={con.release_date || con.first_air_date}
                    mediaType={'tv'}
                    rating={con.vote_average}
                    />
                ))}
            </div>
        </div>
    )
}

export default Series;
