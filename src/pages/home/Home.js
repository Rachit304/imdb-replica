import React, { useEffect, useState } from "react";
import "./Home.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { Link } from "react-router-dom";
import { ScrollMenu } from "react-horizontal-scrolling-menu";
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
    fetchMovies("popular");
    fetchMovies("top_rated");
    fetchMovies("upcoming");
  }, []);

  const fetchMovies = async (type) => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${type}?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US`
      );

      switch (type) {
        case "popular":
          setPopularMovies(response.data.results);
          break;
        case "top_rated":
          setTopRatedMovies(response.data.results);
          break;
        case "upcoming":
          setUpcomingMovies(response.data.results);
          break;
        default:
          break;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const MovieList = ({ movies, title }) => (
    <div className="section">
      <Link
        className="link"
        to={`/movies/${title.toLowerCase().replace(" ", "_")}`}
      >
        <span className="top">{title}</span>
        <FontAwesomeIcon icon={faChevronRight} className="arrow-icon" />
      </Link>
      <div className="magic-wrapper">
        <div className="content-wrapper magic">
          <ScrollMenu className="scroll-menu">
            {movies.map((movie) => (
              <Card key={movie.id} movie={movie} />
            ))}
          </ScrollMenu>
        </div>
      </div>
    </div>
  );

  return (
    <div className="scroll">
      <Carousel
        showThumbs={false}
        autoPlay={true}
        interval={3000}
        transitionTime={1000}
        infiniteLoop={true}
        showStatus={false}
        touch={false}
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

      <MovieList movies={popularMovies} title="Popular" />
      <br />
      <br />
      <MovieList movies={topRatedMovies} title="Top Rated" />
      <br />
      <br />
      <MovieList movies={upcomingMovies} title="Upcoming" />
    </div>
  );
};

export default Home;
