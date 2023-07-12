import React, { useState } from "react";
import Card from "../card/Card";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import MovieDetail from "../movieDetail/MovieDetail";

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=4e44d9029b1270a757cddc766a1bcb63&query=${searchTerm}`
      );
      setMovies(response.data.results);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <Router>
      <div>
        <input type="text" value={searchTerm} onChange={handleChange} />
        <button onClick={handleSearch}>Search</button>

        <Routes>
          <Route path="/" element={<Home movies={movies} isLoading={isLoading} />} />
          <Route path="/movie/:id" element={<MovieDetail />} />
        </Routes>
      </div>
    </Router>
  );
};

const Home = ({ movies, isLoading }) => {
  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {movies.map((movie) => (
            <Card key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Navbar;
