import React, { useEffect, useState } from "react";
import "./Home.css";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { Link } from "react-router-dom";
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
import "react-horizontal-scrolling-menu/dist/styles.css";
import Card from "../../component/card/Card";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

const Home = () => {
  const [popularMovies, setPopularMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);

  useEffect(() => {
    fetchPopularMovies();
    fetchTopRatedMovies();
    fetchUpcomingMovies();
  }, []);

  const fetchPopularMovies = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/popular?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US`
      );
      setPopularMovies(response.data.results);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchTopRatedMovies = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/top_rated?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US`
      );
      setTopRatedMovies(response.data.results);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchUpcomingMovies = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/upcoming?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US`
      );
      setUpcomingMovies(response.data.results);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Carousel
        showThumbs={false}
        autoPlay={true}
        interval={3000}
        transitionTime={1000}
        infiniteLoop={true}
        showStatus={false}
      >
        {popularMovies.map((movie) => (
          <Link
            key={movie.id}
            style={{ textDecoration: "none", color: "white" }}
            to={`/movie/${movie.id}`}
          >
            <div className="posterImage">
              <img
                src={`https://image.tmdb.org/t/p/original${
                  movie && movie.backdrop_path
                }`}
                alt={movie.original_title}
              />
            </div>
            <div className="posterImage__overlay">
              <div className="posterImage__title">
                {movie ? movie.original_title : ""}
              </div>
              <div className="posterImage__runtime">
                {movie ? movie.release_date : ""}
                <span className="posterImage__rating">
                  {movie ? movie.vote_average : ""}
                  <i className="fas fa-star" />{" "}
                </span>
              </div>
              <div className="posterImage__description">
                {movie ? movie.overview : ""}
              </div>
            </div>
          </Link>
        ))}
      </Carousel>

      <div className="section">
        <Link className="link" to="/movies/popular">
          <span className="top">Popular </span>
          <FontAwesomeIcon icon={faChevronRight} className="arrow-icon" />
        </Link>
        <div class="magic-wrapper">
          <div class="content-wrapper magic">
            <ScrollMenu className="scroll-menu">
              {popularMovies.map((movie) => (
                <Card key={movie.id} movie={movie} />
              ))}
            </ScrollMenu>
          </div>
        </div>
      </div>
      <br></br>
      <br></br>

      <div className="section">
        <Link className="link" to="/movies/top-rated">
          <span className="top">Top Rated </span>
          <FontAwesomeIcon icon={faChevronRight} className="arrow-icon" />
        </Link>
        <div class="magic-wrapper">
          <div class="content-wrapper magic">
            <ScrollMenu className="scroll-menu">
              {topRatedMovies.map((movie) => (
                <Card key={movie.id} movie={movie} />
              ))}
            </ScrollMenu>
          </div>
        </div>
      </div>
      <br></br>
      <br></br>

      <div className="section">
        <Link className="link" to="/movies/upcoming">
          <span className="top">Upcoming </span>
          <FontAwesomeIcon icon={faChevronRight} className="arrow-icon" />
        </Link>
        <div class="magic-wrapper">
          <div class="content-wrapper magic">
            <ScrollMenu className="scroll-menu">
              {upcomingMovies.map((movie) => (
                <Card key={movie.id} movie={movie} />
              ))}
            </ScrollMenu>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
