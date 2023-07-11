import React, {useEffect, useState} from "react"
import "./MovieList.css"
import { useParams } from "react-router-dom"
import Card from "../card/Card"
import Skeleton from "react-loading-skeleton";


const MovieList = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [movieList, setMovieList] = useState([])
    const {type} = useParams()

    useEffect(() => {
        setIsLoading(true);
        getData()
    }, [type])

    const getData = () => {
        fetch(`https://api.themoviedb.org/3/movie/${type ? type : "popular"}?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US`)
        .then(res => res.json())
        .then((data) => {
            setMovieList(data.results);
            setIsLoading(false);
          });
    }

    return (
        <div className="movie__list">
            <h2 className="list__title">{(type ? type : "POPULAR").toUpperCase()}</h2>
            <div className="list__cards">
            {isLoading ? (
          Array.from({ length: 10 }).map((_, index) => (
            <div key={index} className="skeleton-card">
              <Skeleton height={300} duration={2} />
            </div>
          ))
        ) : (
          movieList.map((movie) => <Card key={movie.id} movie={movie} />)
        )}
      </div>
    </div>
  );
};

export default MovieList