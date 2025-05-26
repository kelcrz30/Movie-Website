const API_KEY = "d7dc73c95006ac1fd047795b1fe6ede6";
const BASE_URL = "https://api.themoviedb.org/3";

// Get popular movies
export const getPopularMovies = async () => {
  const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
  const data = await response.json();
  return data.results || [];
};

// Search movies
export const searchMovies = async (query) => {
  const response = await fetch(`${BASE_URL}/search/movie?query=${encodeURIComponent(query)}&api_key=${API_KEY}`);
  const data = await response.json();
  return data.results || [];
};
