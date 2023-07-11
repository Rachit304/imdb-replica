import axios from 'axios';

const API_KEY = 'YOUR_API_KEY';

export const searchMovies = async (searchQuery) => {
  try {
    const response = await axios.get(`http://www.omdbapi.com/?apikey=${API_KEY}&s=${searchQuery}`);
    return response.data.Search; // Assuming the API returns an array of movies under the 'Search' key
  } catch (error) {
    console.error('Error searching movies:', error);
    return [];
  }
};
