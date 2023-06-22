import React, { useState } from 'react';
import './Search.css';
import MovieDetails from './MoviesDetails';


const PlaceMovie = ({ movie }) => {
    const [showPopup, setShowPopup] = useState(false);

    const openPopup = () => {
        setShowPopup(true);
    };

    const closePopup = () => {
        setShowPopup(false);
    };
    return (
        <div className='movie'>
            <div onMouseEnter={openPopup} onMouseLeave={closePopup}>
                <div>
                    <h2>{movie.Title}</h2>
                    <img src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/400"} alt={movie.Title} />
                </div>
                {showPopup && (
                    <div className="popup">
                        <MovieDetails movie={movie} />
                    </div>
                )}
            </div>

        </div >
    );
}

export default PlaceMovie;