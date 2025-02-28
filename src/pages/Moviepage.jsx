import { useParams, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { instance } from "../api/axios";
import Heading from "../components/ui/Heading";
import Review from "../components/Review";
import FormAddReview from "../components/FormAddReview";

export default function MoviePage() {
  const [movie, setMovie] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  const fetchMovie = () => {
    instance
      .get(`/movie/${id}`)
      .then((res) => {
        setMovie(res.data);
      })
      .catch((err) => {
        if (err.response?.status === 404) {
          navigate("/404");
        }
      });
  };

  useEffect(fetchMovie, [id, navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black p-10">
      <div className="bg-gray-800 p-12 rounded-2xl shadow-2xl max-w-4xl w-full space-y-8 border border-gray-700">
        <h1 className="text-6xl font-bold text-white mb-8">
          {movie.title || "Titolo non disponibile"}
        </h1>
        <p className="text-xl text-gray-300">
          <span className="font-semibold text-gray-400">Genere:</span> {movie.genre || "Sconosciuto"}
        </p>
        <p className="text-xl text-gray-300">
          <span className="font-semibold text-gray-400">Regista:</span> {movie.director || "Sconosciuto"}
        </p>
        <p className="text-xl text-gray-300">
          <span className="font-semibold text-gray-400">Anno di rilascio:</span> {movie.release_year || "N/D"}
        </p>
        <p className="text-xl text-gray-300">
          <span className="font-semibold text-gray-400">Trama:</span> {movie.abstract || "Sconosciuto"}
        </p>
        <button
          onClick={() => navigate("/")}
          className="w-full bg-gradient-to-r from-purple-700 to-purple-900 text-white py-3 rounded-xl shadow-md font-semibold text-lg transform hover:scale-105 transition-transform duration-300">
          ⬅️ Torna alla Home
        </button>
      </div>
      {movie.reviews?.length > 0 && (
        <section className="mt-16 bg-gray-800 p-10 rounded-2xl shadow-xl w-full max-w-4xl border border-gray-700">
          <Heading level={2} className="text-white text-4xl mb-6">Recensioni</Heading>
          <ul>
            {movie?.reviews?.map((review) => (
              <li className="py-4 border-b border-neutral-600 text-white" key={review.id}>
                <Review review={review} />
              </li>
            ))}
          </ul>
        </section>
      )}
      <section className="mt-4 bg-white p-4 space-y-4">
        <Heading level={3}>Aggiungi una recensione</Heading>
        <FormAddReview fetchMovie={fetchMovie} />
      </section>
    </div>
  );
}
