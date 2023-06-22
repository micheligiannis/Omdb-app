import React, { useState, useEffect } from "react";
import { useParams, Link  } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import back from './back.png';
import './extraDetail.css';
const API_URL = "http://www.omdbapi.com/?apikey=ad404589";

const MoviesDetailsPage = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  const { id } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);


  useEffect(() => {

    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(`${API_URL}&i=${id}&plot=full`);
        const data = await response.json();
        setMovieDetails(data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    fetchMovieDetails();
  }, [id]);


  useEffect(() => {
    const scrollToBottom = () => {
      const pageContainer = document.getElementById("movies-details-page");
      if (pageContainer) {
        pageContainer.scrollIntoView({ behavior: "smooth" });
      }
    };

    scrollToBottom();
  }, []);


  if (!movieDetails) {
    return <div>Loading...</div>;
  }
  return (
    <div className="movie-container">
      <div className="movie-details">
        <h2 class="movie-title">{movieDetails.Title}</h2>
        <div className="movie-details-final">
          <div className="movie-details-final-grid">
            <img src={movieDetails.Poster !== "N/A" ? movieDetails.Poster : "https://via.placeholder.com/400"} alt={movieDetails.Title} />
          </div>
          <div className="movie-details-final-grid">
            <div className="movie-info-span">
              <p><b>Genre:</b> {movieDetails.Genre}</p>
              <p><b>Plot: </b>{movieDetails.Plot}</p>
              <p><b>Release Year: </b> {movieDetails.Year}</p>
              <p><b>Director: </b> {movieDetails.Director}</p>
              <p><b>Writer: </b> {movieDetails.Writer}</p>
              <p><b>Actors: </b> {movieDetails.Actors}</p>
              <p><b>Awards: </b> {movieDetails.Awards}</p>
              <p><b>Rated: </b> {movieDetails.Rated} </p>
              <p><b>Country: </b> {movieDetails.Country} </p>
              <p><b>Movie ID: </b> {id}</p>
            </div>
          </div>

        </div>
        <Link to={`/`} className="back-link">
          <img src={back} alt="back" className="back-logo" onClick={handleGoBack}  />
        </Link>
      </div>
    </div>
  );
};

export default MoviesDetailsPage;
