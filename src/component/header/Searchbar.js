import React, { useState, useEffect } from 'react';

const API_KEY = 'YOUR_API_KEY';

const MoviesPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const searchMovies = async () => {
      if (searchQuery.trim() === '') {
        setMovies([]);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(`http://www.omdbapi.com/?apikey=${API_KEY}&s=${searchQuery}`);
        const data = await response.json();
        
        if (data.Response === 'True') {
          setMovies(data.Search);
        } else {
          setMovies([]);
        }
      } catch (error) {
        setError('Error searching movies.');
      }

      setIsLoading(false);
    };

    searchMovies();
  }, [searchQuery]);

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    // The searchMovies function will be triggered by the useEffect hook
  };

  return (
    <div>
      <h1>Search for Movies</h1>
      <form onSubmit={handleFormSubmit}>
        <input type="text" value={searchQuery} onChange={handleInputChange} />
        <button type="submit">Search</button>
      </form>
      
      {isLoading && <p>Loading...</p>}
      
      {error && <p>{error}</p>}
      
      {movies.length === 0 && !isLoading && !error && <p>No results found.</p>}
      
      {movies.length > 0 && (
        <ul>
          {movies.map((movie) => (
            <li key={movie.imdbID}>{movie.Title}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MoviesPage;
