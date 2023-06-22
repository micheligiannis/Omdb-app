import React, { useState, useEffect  } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import PlaceMovie from "./PlaceMovie";
import Sorting from "./Sorting";
import './Search.css';



const API_URL = "http://www.omdbapi.com/?s=&apikey=ad404589";

const Search = () => {


  const navigate = useNavigate();
  const location = useLocation();;
  const queryParams = new URLSearchParams(location.search);
  const searchTermFromUrl = queryParams.get("searchTerm") || "";

  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);
  const [sortOption, setSortOption] = useState("");
  const [selection, setSelection] = useState("all");

  useEffect(() => {
    if (searchTermFromUrl) {
      searchMovies(searchTermFromUrl);
    }
  }, [searchTermFromUrl,searchTerm]);
  
  const handleSort = (option) => {
    setSortOption(option);
  };

  const updateURL = (title) => {
    const newSearchParams = new URLSearchParams();
    newSearchParams.set("searchTerm", title);
    navigate(`?${newSearchParams.toString()}`);
  };

  const searchMovies = async (title) => {

    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();

    if (data.Response === "True") {
      const movieIds = data.Search.map((movie) => movie.imdbID);
      const moviesWithDetails = await Promise.all(
        movieIds.map(async (id) => {
          const detailsResponse = await fetch(`${API_URL}&i=${id}&plot=full`);
          const detailsData = await detailsResponse.json();
          return detailsData;
        })
      );
      setMovies(moviesWithDetails);
      updateURL(title);
    } else {
      setMovies([]);
    }
    setSelection("all");  //xanei tin palio rythmisi gia movies i' series
    // setSortOption(""); //kratei to sorting , an to bgalw den krataei to proigoumeno sorting
  };


  
  // useEffect(() => {
  //   searchMovies("Batman");
  // }, []);

  
  

  const handleSelectionChange = (selection) => {
    setSelection(selection);
    setSortOption("");
  };


  /** function that filters the option of type  */
  const filteredMovies = movies.filter((movie) => {
    if (selection === "all") {
      return true;
    } else if (selection === "movies") {
      return movie.Type === "movie";
    } else if (selection === "series") {
      return movie.Type === "series";
    }
    return false;
  });

  let sortedMovies = [...filteredMovies];

  /** filters the selection of the button for sorting method */
  if (sortOption === "rating") {
    sortedMovies.sort((a, b) => b.imdbRating - a.imdbRating);
  } else if (sortOption === "alphabetical") {
    sortedMovies.sort((a, b) => a.Title.localeCompare(b.Title));
  } else if (sortOption === "year") {
    sortedMovies.sort((a, b) => b.Year - a.Year);
  }
  const handleSearch = () => {
    searchMovies(searchTerm);
  };

  return (
    <div className="search">
      <input
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search for movies.."
      />
      <button type="button"  onClick={handleSearch}>
        Search
      </button>
      <button type="button" onClick={() => handleSelectionChange("movies")}>
        Movies
      </button>
      <button type="button" onClick={() => handleSelectionChange("series")}>
        Series
      </button>


      <Sorting handleSort={handleSort} />

      {sortedMovies?.length > 0 ? (
        <div className="container">
          {sortedMovies.map((movie) => (
            <PlaceMovie movie={movie} key={movie.imdbID} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No movies or series found</h2>
        </div>
      )}
    </div>
  );
};

export default Search;
