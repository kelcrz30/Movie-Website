import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Nav() {
  const location = useLocation();

  return (
    <div>
      <nav className="w-full flex justify-end px-6 py-4 absolute top-0 left-0 z-10">
        <div className="flex space-x-6">
          <Link 
            to="/" 
            className={`transition ${
              location.pathname === '/' 
                ? 'text-red-500 text-2xl' 
                : 'text-white hover:text-red-500 text-2xl'
            }`}
          >
            Home
          </Link>
          <Link 
            to="/favorites" 
            className={`transition ${
              location.pathname === '/favorites' 
                ? 'text-red-500 text-2xl' 
                : 'text-white hover:text-red-500 text-2xl '
            }`}
          >
            Favorite
          </Link>
        </div>
      </nav>
    </div>
  );
}

export default Nav;