import { useEffect, useState } from "react";
import MovieCard from "../../components/MovieCard/movieCard";
import MovieCreationRoundedIcon from '@mui/icons-material/MovieCreationRounded';
import IconButton from '@mui/material/IconButton';
import ClearAllRoundedIcon from '@mui/icons-material/ClearAllRounded';
import './saved.css';


const Saved = () => {
  const [content, setContent] = useState([]);

  const getSavedContent = () => {
    const data = JSON.parse(localStorage.getItem("bookmarks"));
    setContent(data);
  }

  useEffect(() => {
    getSavedContent();
  }, []);

  const clearSaved = () => {
    localStorage.clear();
    setContent([]);
  }

  return (
    <div>
      <span className="PageTitle">
        <span>
          <MovieCreationRoundedIcon></MovieCreationRoundedIcon>
        </span>&nbsp;&nbsp;Saved
      </span>
        <IconButton className="clearSavedIcon" onClick={clearSaved} title="Clear Saved">
            <ClearAllRoundedIcon />
        </IconButton>
      <div className="trending">
        {content && content.map((con) => (
          <MovieCard
            key={con.id}
            id={con.id}
            poster={con.poster}
            title={con.title || con.name}
            date={con.date}
            mediaType={con.mediaType}
            rating={con.rating}
          />
        ))}
      </div>
    </div>
  );
}

export default Saved;
