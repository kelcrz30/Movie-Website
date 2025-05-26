import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Nav from "./Components/nav";
import Home from "./Components/Home";
import Card from "./Components/Card";
import { searchMovies, getPopularMovies} from "./Api";
import Favorite from "./Components/Favorite";
import Footer from "./Components/Footer";

function App() {
  const [movie, setMovie] = useState([]);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true); 
  const [favorites, setFavorite] = useState([]);  

  const toggleFavorite = (movieToToggle) => {
    setFavorite(prevFavorites => {
      const isAlreadyFavorite = prevFavorites.some(fav => fav.id === movieToToggle.id)

      if(isAlreadyFavorite){
        return prevFavorites.filter(fav => fav.id !== movieToToggle.id)
      } else {
        return[...prevFavorites, movieToToggle]
      }
    })
  }
  const isFavorite = (movieid) => {
    return favorites.some(fav => fav.id === movieid)
  }

  useEffect(() => {
    const loadPopularMovies = async () => {
      setLoading(true); 
      try {
        const popularMovies = await getPopularMovies();
        setMovie(popularMovies);
        setError(null);
      } catch (error) {
        console.error(error);
        setError("Failed to load movies");
      } finally {
        setLoading(false);
      }
    };
    loadPopularMovies();
  }, []);

  useEffect(() => {
    const delayDebounce = setTimeout(async () => {
      setLoading(true); 
      
      if (!searchQuery.trim()) {
        try {
          const popularMovies = await getPopularMovies();
          setMovie(popularMovies);
          setError(null);
        } catch (error) {
          console.error(error);
          setError("Error loading popular movies");
        } finally {
          setLoading(false);
        }
      } else {
        try {
          const searchResult = await searchMovies(searchQuery);
          setMovie(searchResult);
          setError(null);
        } catch (error) {
          console.error(error);
          setError("Failed to search movies");
        } finally {
          setLoading(false);
        }
      }
    }, 1000);

    return () => clearTimeout(delayDebounce);
  }, [searchQuery]);

 return (
    <Router>
      <div className="min-h-screen bg-[#21232C] text-white">
        <Nav />
        
        {error && <p className="text-red-500 text-center my-4">{error}</p>}
        {loading && <p className="text-gray-300 text-center my-4">Loading movies...</p>}
        
        <Routes>
          <Route 
            path="/" 
            element={
              <>
                <Home
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                  loading={loading}
                />
                <div className="py-1 sm:mx-10 md:mx-1 lg:mx-1 2xl:mx-10 min-h-screen">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3
                                  lg:grid-cols-3 xl:grid-cols-5 gap-10 justify-items-center px-10">
                    {movie.map((movie) => (
                      <Card
                       key={movie.id}
                        movie={movie}
                        onToggleFavorite={toggleFavorite}
                        isFavorite={isFavorite(movie.id)}
                      />
                    ))}
                  </div>
                </div>
              </>
            } 
          />
          <Route path="/favorites" element={<Favorite 
          favorites={favorites}
          onToggleFavorite={toggleFavorite}
          isFavorite={isFavorite}
          />} />
        </Routes>
         <Footer 
         />
      </div>
    </Router>
  );
}

export default App;

