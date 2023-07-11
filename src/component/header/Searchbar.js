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
      <div className="input-group searchbar">
              <input type="text" className="form-control" placeholder="Search this blog" />
              <div className="input-group-append">
                <button className="btn btn-secondary" type="button">
                <i className="fa fa-search"></i>
                </button>
                <br></br>
              </div>
    </div>
  );
};

export default Searchbar;
