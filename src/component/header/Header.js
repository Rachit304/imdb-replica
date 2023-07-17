import React, { useState, useEffect, useRef } from "react";
import Card from "../card/Card";
import axios from "axios";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";

import MovieDetail from "../movieDetail/MovieDetail";
import LiveSearchResults from "../search/LiveSearchResults";

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [liveSearchResults, setLiveSearchResults] = useState([]);
  const navigate = useNavigate();
  const searchInputRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchInputRef.current &&
        !searchInputRef.current.contains(event.target)
      ) {
        setLiveSearchResults([]);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleSearch = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=4e44d9029b1270a757cddc766a1bcb63&query=${searchTerm}`
      );
      setMovies(response.data.results);
      navigate("/search");
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  const handleChange = async (event) => {
    setSearchTerm(event.target.value);
    if (event.target.value.trim() === "") {
      setLiveSearchResults([]);
      return;
    }
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=4e44d9029b1270a757cddc766a1bcb63&query=${event.target.value}`
      );
      setLiveSearchResults(response.data.results);
    } catch (error) {
      console.log(error);
    }
  };

  const handleResultClick = (movie) => {
    setSearchTerm(movie.title);
    setLiveSearchResults([]);
    navigate(`/movie/${movie.id}`);
  };

  return (
    <div>
      <section className="header-main  bg-dark">
        <div className="container-fluid">
          <div className="row p-2 pt-3 pb-3 d-flex align-items-center">
            <div className="col-md-2">
              <Link to="/">
                <img
                  className="d-none d-md-flex"
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/IMDB_Logo_2016.svg/2560px-IMDB_Logo_2016.svg.png"
                  width="100"
                  alt="Logo"
                />
              </Link>
            </div>
            <div className="col-md-8">
              <div className="d-flex form-inputs">
                <div className="container" ref={searchInputRef}>
                  <div className="container">
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Search for..."
                        value={searchTerm}
                        onChange={handleChange}
                      />
                      <span className="input-group-btn">
                        <button
                          className="btn btn-search"
                          type="button"
                          onClick={handleSearch}
                        >
                          <i className="fa fa-search fa-fw"></i> Search
                        </button>
                        {liveSearchResults.length > 0 && (
                          <LiveSearchResults
                            results={liveSearchResults}
                            onClick={handleResultClick}
                          />
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-2">
              <div className="d-flex d-none d-md-flex flex-row align-items-center">
                <span className="shop-bag">
                  <i className="bx bxs-shopping-bag"></i>
                </span>
                <div className="d-flex flex-column ms-2">
                  <span className="qty">Sign In</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Routes>
        <Route path="/search" element={<SearchResults movies={movies} />} />
        <Route path="/movie/:id" element={<MovieDetail />} />
      </Routes>
    </div>
  );
};

const SearchResults = ({ movies }) => {
  return (
    <div>
      {movies.map((movie) => (
        <Card key={movie.id} movie={movie} />
      ))}
    </div>
  );
};

export default Navbar;
