function Footer() {
  return (
    <footer className="flex flex-col items-center text-center py-20 ">
      <nav className="flex gap-4 mb-6">
        <a href="#" className="text-red-500 hover:underline">Android App</a>
        <a href="#" className="text-red-500 hover:underline">Terms of Service</a>
        <a href="#" className="text-red-500 hover:underline">Contacts</a>
      </nav>
      <div className="text-sm text-gray-500 max-w-xl px-4">
        <p>
          Discover your next favorite film with <strong>Movie Explorer</strong>, a sleek and user-friendly movie app powered by the OMDb API. <br />
          Search for movies by title, explore detailed information including posters, release year, genre, plot summaries, and ratings — all in one place. <br />
          Featuring reusable components and a modern React design, Movie Explorer delivers a fast and smooth experience for movie enthusiasts and developers alike.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
