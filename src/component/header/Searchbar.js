import React, { useState, useEffect } from 'react';


const Searchbar = () => {
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
        // Make your API call to fetch the searched movies
        // Assign the fetched movie data to the `movies` state

        // Example API call using fetch
        const response = await fetch(` http://www.omdbapi.com/?i=tt3896198&apikey=f60aa48f?q=${searchQuery}`);
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

      {movies.length > 0 && <Card movies={movies} />}
    </div>
  );
};

export default Searchbar;
