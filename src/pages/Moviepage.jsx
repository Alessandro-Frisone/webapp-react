import { useParams, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { instance } from "../api/axios";
import Heading from "../components/ui/Heading";
import Paragraph from "../components/ui/Paragraph";
import Stars from "../components/ui/Stars";
import Review from "../components/Review";

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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-8 pt-24">
      <div className="bg-white rounded-lg shadow-md p-10 max-w-4xl w-full space-y-8">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          {movie.title || "Titolo non disponibile"}
        </h1>
        <p className="text-lg text-gray-800">
          <span className="font-semibold">Genere:</span> {movie.genre || "Sconosciuto"}
        </p>
        <p className="text-lg text-gray-800">
          <span className="font-semibold">Regista:</span> {movie.director || "Sconosciuto"}
        </p>
        <p className="text-lg text-gray-800">
          <span className="font-semibold">Anno di rilascio:</span> {movie.release_year || "N/D"}
        </p>
        <p className="text-lg text-gray-800">
          <span className="font-semibold">Trama:</span> {movie.abstract || "Sconosciuto"}
        </p>
        <button
          onClick={() => navigate("/")}
          className="mt-4 w-full bg-gray-900 text-white py-3 rounded-md font-semibold shadow-md 
                     hover:bg-gray-600 transition-all duration-300"
        >
          ⬅️ Torna alla Home
        </button>
      </div>

      {movie.reviews?.length > 0 && (
        <section className="mt-12 bg-white p-8 rounded-lg shadow-md w-full max-w-4xl">
          <Heading level={2} className="text-3xl font-bold text-gray-900 mb-6">Recensioni</Heading>
          <ul>
            {movie.reviews.map((review) => (
              <li className="py-4 border-b border-neutral-300" key={review.id}>
                <Review review={review} />
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
