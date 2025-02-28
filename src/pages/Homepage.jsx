import { useState, useEffect } from "react";
import { instance } from "../api/axios";
import { Link } from "react-router-dom";

function HomePage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await instance.get("/movie");
        setMovies(Array.isArray(response.data) ? response.data : []);
      } catch (err) {
        console.error("Errore nel recupero dei film:", err);
        setError("Si è verificato un errore durante il caricamento dei film. Riprova più tardi.");
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (loading) return <div className="text-center text-2xl py-20 text-gray-700">Caricamento in corso...</div>;
  if (error) return <div className="text-red-600 text-center py-20 text-xl">{error}</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black p-10">
      <h1 className="text-6xl font-extrabold text-center mb-16 text-white drop-shadow-lg tracking-wider">
        🎬 Collezione Cinematografica 🌟
      </h1>

      {movies.length === 0 ? (
        <p className="text-center text-white text-3xl italic">
          Attualmente non ci sono film disponibili.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12">
          {movies.map((movie, index) => (
            <div
              key={movie.id || index}
              className="relative bg-gray-800 bg-opacity-80 p-8 rounded-2xl shadow-2xl hover:shadow-3xl transition-shadow duration-300 transform hover:-translate-y-2 border border-gray-700 flex flex-col justify-between"
            >
              <div className="absolute -top-5 -right-5 bg-red-600 text-white text-sm font-bold px-3 py-1 rounded-full shadow-lg">
                🎬 NEW!
              </div>
              <h2 className="text-3xl font-bold text-white mb-4">
                {movie.title || "Titolo non disponibile"}
              </h2>
              <div className="w-full h-60 mb-4 overflow-hidden rounded-lg">
                <img className="w-full h-full object-cover" src={movie.image} alt={movie.title} />
              </div>
              <p className="text-gray-400 mb-2">
                <span className="font-semibold text-gray-300">Regista:</span> {movie.director || "Sconosciuto"}
              </p>
              <p className="text-gray-500 mb-6">
                <span className="font-semibold text-gray-300">Anno:</span> {movie.release_year || "N/D"}
              </p>
              <Link to={`/movie/${movie.id}`}>
                <button className="w-full bg-gradient-to-r from-purple-700 to-purple-900 text-white py-3 rounded-xl shadow-md font-semibold text-lg transform hover:scale-105 transition-transform duration-300">
                  🎥 Scopri di più
                </button>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default HomePage;
