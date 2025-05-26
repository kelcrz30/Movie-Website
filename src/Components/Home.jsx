
// Separate component (in different file)
function Home({searchQuery, setSearchQuery, handleSearch, loading, clearSearch}) {
  return ( 
<main className="bg-[#21232C] min-h-screen">
  <div
    style={{
      backgroundImage: 'url("/bg-wallpaper.png")',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
    }}
    className="relative w-full h-[700px] sm:h-[700px] md:h-[600px] lg:h-[700px] xl:h-[750px] flex flex-col justify-center items-center text-white px-4"
  >
    {/* Title */}
    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-red-600 mt-16 text-center">
      CineLuxe
    </h1>

    {/* Subtitle */}
    <p className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-gray-400 font-light italic tracking-wide leading-relaxed text-center mt-4 px-4 max-w-xl">
      Where great films meet great taste
    </p>

    {/* Search form */}
<form onSubmit={handleSearch}
     action="" 
     className="flex flex-row items-center gap-4 mt-10 w-full max-w-md px-4">
  <input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
       type="text"
       placeholder="Input Movie"
       className="bg-white/45 text-white placeholder-white/80 p-3 rounded flex-1 border-none focus:outline-none"
  />
  <button
    type="submit"
    className="bg-red-700 rounded hover:bg-red-800 active:bg-red-900 transition flex items-center justify-center px-4 py-3"
  >
    <span className="material-symbols-outlined text-white">
      search
    </span>
  </button>
</form>
  </div>
  <section>
    <div>
        <h1 className=
        "text-white text-2xl sm:text-3xl md:text-4xl font-medium py-28 px-5 "
        >Popular Movies</h1>
    </div>
  </section>
</main>


   );
}


export default Home ;