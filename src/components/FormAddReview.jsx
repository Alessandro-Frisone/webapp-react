import { instance } from "../api/axios";
import { useState } from "react";
import { useParams } from "react-router";
import { useAlertContext } from "../contexts/AlertContext";


const initialFormData = {
  name: "",
  text: "",
  vote: 0,
};

export default function FormAddReview({ fetchMovie }) {
  const [formData, setFormData] = useState(initialFormData);
  const { id } = useParams();
  const { setAlertData } = useAlertContext();

  const handleField = (fieldName, fieldValue) => {
    setFormData((currentFormData) => {
      return {
        ...currentFormData,
        [fieldName]: fieldValue,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    instance
      .post(`/movie/${id}/reviews`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(() => {
        setFormData(initialFormData);
        setAlertData({
          title: "Aggiunta recensione",
          text: "Una nuova recensione è stata aggiunta al libro.",
          variant: "success",
        });
        fetchMovie();
      })
      .catch((error) => {
        console.error(error)
        setAlertData({
          title: "Errore",
          text: "Si è verificato un errore durante il salvataggio della recensione",
          variant: "danger",
        });
      });
  };

  return (
    <form className="space-y-2" onSubmit={handleSubmit}>
      <div>
        <label className="inline-block mb-1" htmlFor="name">
          Nome
        </label>
        <input
          className="w-full border border-neutral-200 p-2 rounded-sm"
          id="name"
          name="name"
          type="text"
          placeholder="Inserisci il tuo nome"
          value={formData.name}
          onChange={(e) => handleField("name", e.target.value)}
          required
        />
      </div>
      <div>
        <label className="inline-block mb-1" htmlFor="vote">
          Voto
        </label>
        <input
          className="w-full border border-neutral-200 p-2 rounded-sm"
          id="vote"
          name="vote"
          type="number"
          min={0}
          max={5}
          placeholder="Inserisci il voto"
          value={formData.vote}
          onChange={(e) => handleField("vote", e.target.value)}
        />
      </div>
      <div>
        <label className="inline-block mb-1" htmlFor="text">
          Recensione
        </label>
        <textarea
          className="w-full border border-neutral-200 p-2 rounded-sm"
          id="text"
          name="text"
          placeholder="Inserisci il testo della recensione"
          rows={5}
          value={formData.text}
          onChange={(e) => handleField("text", e.target.value)}
          required
          minLength={5}
        ></textarea>
      </div>
      <button type="submit">Invia</button>
    </form>
  );
}