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

  if (loading) return <div className="text-center text-xl py-10">Caricamento...</div>;
  if (error) return <div className="text-red-500 text-center py-10">{error}</div>;

  return (
    <div className="min-h-screen bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-8">
      <h1 className="text-5xl font-extrabold text-center mb-10 text-white drop-shadow-lg">
        🎬 I Nostri Film 🌟
      </h1>

      {movies.length === 0 ? (
        <p className="text-center text-white text-2xl">
          Nessun film disponibile al momento.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {movies.map((movie, index) => (
            <div
              key={movie.id || index}
              className="relative bg-white bg-opacity-90 p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:-translate-y-2"
            >
              <div className="absolute -top-4 -right-4 bg-yellow-500 text-white text-sm font-bold px-2 py-1 rounded-full shadow-lg animate-bounce">
                🎬 NEW!
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                {movie.title || "Titolo non disponibile"}
              </h2>
              <div className="w-1/2">
                <img className="h-full object-cover" src={movie.image} alt={movie.title} />
              </div>
              <p className="text-gray-700 mb-1">
                <span className="font-semibold">Regista:</span> {movie.director || "Sconosciuto"}
              </p>
              <p className="text-gray-600 mb-4">
                <span className="font-semibold">Anno:</span> {movie.release_year || "N/D"}
              </p>
              <Link to={`/movie/${movie.id}`}>
                <button className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 rounded-lg shadow-md font-semibold text-lg transform hover:scale-105 hover:rotate-1 transition-transform duration-300">
                  🎥 Guarda Dettagli
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
