import { useState } from "react";
import { useEffect } from "react";
import "./App.css";
import SearchIcon from "./search.svg";
import MovieCard from "./MovieCard";

// Now we use this to get data about movies from the website.
const API_URL = process.env.REACT_APP_NOT_SECRET;

const App = () => {
  // Create a new state for map() through all movies from API.

  const [movies, setMovies] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");

  const searchMovies = async (title) => {
    // Research using the URL + title.
    const response = await fetch(`${API_URL}&s=${title}`);

    // Put this data in the Json format.
    const data = await response.json();
    // From data i want specific the list of movies.
    // Now i will reveive an array with all movies that have the name batman.
    console.log(data.Search);
    setMovies(data.Search);
  };

  // We want use this API when the page load. That why we will use useEffect.
  //
  useEffect(() => {
    // Everytime the page loads call for this data.
    searchMovies("batman");
  }, []);

  return (
    <div className="app">
      <h1>All Movies</h1>
      <div className="search">
        <input
          placeholder="Search for movies"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <img
          src={SearchIcon}
          alt="search"
          onClick={() => searchMovies(searchTerm)}
        />
      </div>
      {/* // Main Container for the movies: */}
      {/* Create a condition that will show the content if is true and show some message if it's false. */}
      <div className="container">
        {movies?.length > 0 ? (
          <div className="container">
            {movies.map((movie) => (
              <MovieCard movie={movie} />
            ))}
          </div>
        ) : (
          <div className="empty">
            <h2>No movies Found!!</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
