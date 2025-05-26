import React, { useState } from "react";
import { FaHeart, FaRegHeart, FaTimes, FaStar, FaPlay, FaCalendarAlt, FaClock, FaGlobe } from "react-icons/fa";

const Card = ({ movie, onToggleFavorite, isFavorite }) => {
  const [showModal, setShowModal] = useState(false);

  const handleLikeClick = (e) => {
    e.stopPropagation();
    onToggleFavorite(movie);
  };

  const handleCardClick = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const mockReviews = [
    {
      id: 1,
      author: "Sarah M.",
      rating: 4.5,
      comment: "Absolutely brilliant! The cinematography was stunning and the storyline kept me engaged throughout.",
      date: "2024-03-15"
    },
    {
      id: 2,
      author: "Mike R.",
      rating: 4.0,
      comment: "Great performances and direction. A must-watch for fans of the genre.",
      date: "2024-03-10"
    },
    {
      id: 3,
      author: "Emma L.",
      rating: 5.0,
      comment: "One of the best films I've seen this year. Exceptional acting and beautiful visuals.",
      date: "2024-03-08"
    }
  ];

  const genreMap = {
    28: "Action",
    12: "Adventure", 
    16: "Animation",
    35: "Comedy",
    80: "Crime",
    99: "Documentary",
    18: "Drama",
    10751: "Family",
    14: "Fantasy",
    36: "History",
    27: "Horror",
    10402: "Music",
    9648: "Mystery",
    10749: "Romance",
    878: "Science Fiction",
    10770: "TV Movie",
    53: "Thriller",
    10752: "War",
    37: "Western"
  };

  const getGenres = () => {
    if (!movie.genre_ids && !movie.genres) return ["Unknown"];
    
    if (movie.genre_ids) {
      return movie.genre_ids.map(id => genreMap[id]).filter(Boolean);
    }
    
    if (movie.genres && Array.isArray(movie.genres)) {
      return movie.genres.map(genre => genre.name);
    }
    
    return ["Unknown"];
  };

  const genres = getGenres();
  const releaseYear = movie.release_date ? new Date(movie.release_date).getFullYear() : "N/A";
  const runtime = movie.runtime || 120; // minutes

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={i} className="text-yellow-400" />);
    }
    if (hasHalfStar) {
      stars.push(<FaStar key="half" className="text-yellow-400 opacity-50" />);
    }
    for (let i = stars.length; i < 5; i++) {
      stars.push(<FaStar key={i} className="text-gray-600" />);
    }
    return stars;
  };

  return (
    <>
      {/* Movie Card */}
      <div
        onClick={handleCardClick}
        className="relative bg-[#2A2C37] rounded-xl overflow-hidden shadow-lg
                   w-[250px] md:w-[230px] lg:w-[260px] xl:w-[240px]
                   transition-all duration-300 hover:scale-105 hover:shadow-2xl text-white cursor-pointer group"
      >
        {/* Favorite Button */}
        <button
          onClick={handleLikeClick}
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
          className="absolute top-2 right-2 z-30 p-2 bg-black/50 rounded-full hover:bg-black/70 transition"
        >
          {isFavorite ? (
            <FaHeart className="text-red-500 text-xl" />
          ) : (
            <FaRegHeart className="text-white text-xl" />
          )}
        </button>

        {/* Play Button Overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 
                        transition-opacity duration-300 flex items-center justify-center z-10">
          <div className="bg-white/20 backdrop-blur-sm rounded-full p-4">
            <FaPlay className="text-white text-2xl ml-1" />
          </div>
        </div>

        {/* Movie Poster */}
        <div className="h-[360px] w-full overflow-hidden">
          <img
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                : "/placeholder.jpg"
            }
            alt={movie.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
        </div>

        {/* Content */}
        <div className="p-3">
          <h3 className="text-lg font-semibold truncate mb-2">{movie.title}</h3>
          
          {/* Rating and Year */}
          <div className="flex items-center justify-between text-sm text-gray-300 mb-2">
            <div className="flex items-center gap-1">
              <FaStar className="text-yellow-400 text-xs" />
              <span>{movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"}</span>
            </div>
            <span>{releaseYear}</span>
          </div>

          {/* Genres */}
          <div className="flex flex-wrap gap-1">
            {genres.slice(0, 2).map((genre, index) => (
              <span 
                key={index}
                className="text-xs bg-blue-600/30 text-blue-300 px-2 py-1 rounded-full"
              >
                {genre}
              </span>
            ))}
            {genres.length > 2 && (
              <span className="text-xs text-gray-400">+{genres.length - 2}</span>
            )}
          </div>
        </div>
      </div>

      {/* Professional Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#1A1B23] rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
            {/* Modal Header */}
            <div className="relative">
              <div className="h-64 bg-gradient-to-t from-[#1A1B23] to-transparent">
                <img
                  src={
                    movie.backdrop_path
                      ? `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`
                      : movie.poster_path
                      ? `https://image.tmdb.org/t/p/w1280${movie.poster_path}`
                      : "/placeholder.jpg"
                  }
                  alt={movie.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A1B23] via-transparent to-transparent" />
              </div>
              
              {/* Close Button */}
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 p-2 bg-black/50 rounded-full hover:bg-black/70 transition text-white"
              >
                <FaTimes className="text-xl" />
              </button>

              {/* Movie Poster and Info */}
              <div className="absolute bottom-6 left-6 flex gap-6">
                <img
                  src={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
                      : "/placeholder.jpg"
                  }
                  alt={movie.title}
                  className="w-32 h-48 object-cover rounded-lg shadow-lg"
                />
                <div className="text-white">
                  <h2 className="text-3xl font-bold mb-2">{movie.title}</h2>
                  <div className="flex items-center gap-4 mb-3">
                    <div className="flex items-center gap-1">
                      {renderStars(movie.vote_average / 2)}
                      <span className="ml-2 text-lg font-semibold">{movie.vote_average ? (movie.vote_average / 2).toFixed(1) : "N/A"}/5</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-300">
                    <div className="flex items-center gap-1">
                      <FaCalendarAlt />
                      <span>{releaseYear}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <FaClock />
                      <span>{runtime} min</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <FaGlobe />
                      <span className="uppercase">{movie.original_language}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto max-h-[50vh]">
              {/* Genres */}
              <div className="mb-6">
                <div className="flex flex-wrap gap-2">
                  {genres.map((genre, index) => (
                    <span 
                      key={index}
                      className="bg-blue-600/20 text-blue-300 px-3 py-1 rounded-full text-sm border border-blue-600/30"
                    >
                      {genre}
                    </span>
                  ))}
                </div>
              </div>

              {/* Overview */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-white mb-3">Overview</h3>
                <p className="text-gray-300 leading-relaxed">
                  {movie.overview || "No overview available for this movie."}
                </p>
              </div>

              {/* Reviews Section */}
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Reviews</h3>
                <div className="space-y-4">
                  {mockReviews.map((review) => (
                    <div key={review.id} className="bg-[#2A2C37] rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                            {review.author.charAt(0)}
                          </div>
                          <div>
                            <h4 className="text-white font-medium">{review.author}</h4>
                            <p className="text-gray-400 text-sm">{review.date}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          {renderStars(review.rating)}
                          <span className="text-white ml-1">{review.rating}</span>
                        </div>
                      </div>
                      <p className="text-gray-300 text-sm leading-relaxed">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Card;