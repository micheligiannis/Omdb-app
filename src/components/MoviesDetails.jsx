import React from "react";
import { Link } from "react-router-dom";
import info from './info.png';
import './extraDetail.css';

const MovieDetails = ({ movie, searchTerm }) => {
    return (

        <div className="movie-details">
            <h2>{movie.Title}</h2>
            <p>Release Year: {movie.Year}</p>
            <p>Type: {movie.Type}</p>
            <p>Plot: {movie.Plot}</p>
            <p>Rated:  {movie.Rated}</p>
            <p>ID : {movie.imdbID}</p>
            <h5>More info</h5>
            <Link to={`/movies/${movie.imdbID}?searchTerm=${searchTerm}`} className="more-info">
                <img src={info} alt="info" className="info-logo" />
            </Link>

            {/* <button onClick={onClose}>Click for more details</button> */}
        </div>
    );
};

export default MovieDetails;
