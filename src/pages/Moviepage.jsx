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
    <div className="flex items-start justify-center min-h-screen bg-gradient-to-br from-pink-100 to-yellow-100 p-6 pt-20">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
        <h1 className="text-4xl font-bold text-pink-600 mb-4">
          🎬 {movie.title || "Titolo non disponibile"}
        </h1>
        <p className="text-lg text-gray-700 mb-2">
          <span className="font-semibold">Genere:</span>{" "}
          {movie.genre || "Sconosciuto"}
        </p>
        <p className="text-lg text-gray-700 mb-2">
          <span className="font-semibold">Regista:</span>{" "}
          {movie.director || "Sconosciuto"}
        </p>
        <p className="text-lg text-gray-600 mb-2">
          <span className="font-semibold">Anno di rilascio:</span>{" "}
          {movie.release_year || "N/D"}
        </p>
        <p className="text-lg text-gray-700 mb-6">
          <span className="font-semibold">Trama:</span>{" "}
          {movie.abstract || "Sconosciuto"}
        </p>
        <button
          className="w-full bg-pink-500 text-white py-3 rounded-lg font-semibold shadow-md 
                   hover:bg-pink-600 transition-colors duration-300"
        >
          🎥 Guarda il Trailer
        </button>
      </div>
      <div className="col-span-12 md:col-span-8 space-y-4 bg-white p-4">
          <Heading level={1}>{movie.title}</Heading>
          <Stars vote={movie.avg_vote} />
          <Heading level={3}>{movie.author}</Heading>
          <Paragraph>{movie.abstract}</Paragraph>
        </div>
      {movie.reviews?.length > 0 && (
        <section className="mt-4 bg-white p-4 space-y-4">
          <Heading level={2}>Recensioni</Heading>
          <ul>
            {movie?.reviews?.map((review) => (
              <li className="py-2 border-b border-neutral-200" key={review.id}>
                <Review review={review} />
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
