import axios from "axios"
import { useEffect, useState } from "react";
import MovieCard from "../../components/MovieCard/movieCard";
import './trending.css'
const Trending = () =>{

    const [content, setContent]  = useState([]);

    const getTrending = async() =>{
        const {data} = await axios.get(`https://api.themoviedb.org/3/trending/all/day?api_key=1b3d13704eedfdbecf045cc5f3f964c5`
        );
        setContent(data.results);
    }


    useEffect(() => {
        getTrending();
    }, []);

    return (
        <div>
            <span className="PageTitle"> Trending</span>
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
            </div>
        </div>
    )
}

export default Trending;