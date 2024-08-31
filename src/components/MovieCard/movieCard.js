import "./movieCard.css";
import { img_300, unavailable } from "../../config/config";
import Badge from "@mui/material/Badge";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { useState, useEffect } from "react";
import axios from "axios";

const MovieCard = ({
  id,
  poster,
  title,
  date,
  mediaType,
  rating,
}) => {  
    const [ytKey, setContent] = useState(null); 
    const getYTChannel = async() =>{
      const {data} = await axios.get(`https://api.themoviedb.org/3/${mediaType}/${id}/videos?api_key=1b3d13704eedfdbecf045cc5f3f964c5&language=en-US`
        );
        setContent(data.results[0]?.key || null);
    }


    useEffect(() => {
      if (ytKey) { // update the ytKey state after it has been set
        window.open(`https://www.youtube.com/watch?v=${ytKey}`);
      }
    }, [ytKey]);



    const [isBookmarked, setIsBookmarked] = useState(false);

    useEffect(() => {
        const bookmarkData = JSON.parse(localStorage.getItem("bookmarks"));
        if (bookmarkData) {
          setIsBookmarked(bookmarkData.some((data) => data.id === id));
        }
      }, [id]);

    const handleBookmarkClick = () => {
      const bookmarkData = JSON.parse(localStorage.getItem("bookmarks")) || [];
      const newBookmarkData = { id, poster, title, date, mediaType, rating };
      const bookmarkIndex = bookmarkData.findIndex((data) => data.id === id);

      if (bookmarkIndex === -1) {
        bookmarkData.push(newBookmarkData);
        localStorage.setItem("bookmarks", JSON.stringify(bookmarkData));
        setIsBookmarked(true);
      } else {
        bookmarkData.splice(bookmarkIndex, 1);
        localStorage.setItem("bookmarks", JSON.stringify(bookmarkData));
        setIsBookmarked(false);
      }
    };

    const handleCardClick = async () => {
      // await getYTChannel();
      // if (ytKey) {
      //   window.open(`https://www.youtube.com/watch?v=${ytKey}`);
      // } else {
      //   alert("No trailer available.");
      // }
      getYTChannel();
    };
    

    return (
      <div className="mediaCard">
        <Badge badgeContent={rating} color={rating > 6 ? "primary" : "error"}>
          {" "}
        </Badge>
        <div
          className="bookmarkIcon"
          onClick={handleBookmarkClick}
          style={{ color: isBookmarked ? "red" : "white" }}
        >
          {isBookmarked ? <BookmarkIcon /> : <BookmarkBorderIcon />}
        </div>
        <img
          className="poster"
          src={poster ? `${img_300}${poster}` : unavailable}
          alt={title}
          onClick={handleCardClick}
        />
        <b className="title">{title}</b>
        <span className="subtitle" id="type">
          {mediaType === "tv" ? "TV Series" : "Movie"}
          <span className="subtitle" id="dateReleased">
            {date}
          </span>
        </span>
      </div>
    );
};

export default MovieCard;
