import React from 'react';
import Card from './Card';

function Favorite({ favorites, onToggleFavorite, isFavorite }) {
  return (
    <div className="pt-20 px-5 min-h-screen">
      <div className="max-w-10xl sm:max-w-5xl lg:max-w-1/1 xl:max-w-4/5 mx-auto ">
        <h1 className="text-3xl font-bold text-white mb-8 text-center">
          My Favorite Movies
        </h1>
        
        {favorites.length === 0 ? (
          <div className="text-center text-gray-400 mt-20">
            <div className="text-6xl mb-4">💔</div>
            <h2 className="text-2xl mb-2">No favorites yet</h2>
            <p>Start liking movies to see them here!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-6 justify-items-center">
            {favorites.map((movie) => (
              <Card 
                key={movie.id} 
                movie={movie} 
                onToggleFavorite={onToggleFavorite}
                isFavorite={isFavorite(movie.id)}
              />
            ))}
          </div>
        )}
      </div>
      
    </div>
  );
}

export default Favorite;