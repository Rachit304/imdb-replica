import React, { useEffect, useState } from "react";
import "./MovieList.css";
import { useParams } from "react-router-dom";
import Card from "../card/Card";
import Skeleton from "react-loading-skeleton";

const MovieList = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [movieList, setMovieList] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const { type } = useParams();


  useEffect(() => {
    setIsLoading(true);
    setPage(1);
    setMovieList([]); // Clear movie list when the movie type changes
    getData();
  }, [type]);

  useEffect(() => {
    if (page > 1) {
      getData();
    }
  }, [page]);

  const getData = () => {
    fetch(
      `https://api.themoviedb.org/3/movie/${type ? type : "popular"
      }?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US&page=${page}`
    )
      .then((res) => res.json())
      .then((data) => {
        setMovieList((prevMovieList) => [...prevMovieList, ...data.results]);
        setIsLoading(false);
        setTotalPages(data.total_pages);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };

  const handleScroll = () => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;

    if (scrollTop + clientHeight >= scrollHeight - 10 && !isLoading) {
      if (page < totalPages) {
        setPage((prevPage) => prevPage + 1);
      }
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [page, isLoading]);

  return (
    <div className="movie__list">
      <h2 className="list__title">{(type ? type : "POPULAR").toUpperCase()}</h2>
      <div className="list__cards">
        {isLoading
          ? Array.from({ length: 10 }).map((_, index) => (
            <div key={index} className="skeleton-card">
              <Skeleton height={300} duration={2} />
            </div>
          ))
          : movieList.map((movie) => <Card key={movie.id} movie={movie} />)}
      </div>
    </div>
  );
};

export default MovieList;
