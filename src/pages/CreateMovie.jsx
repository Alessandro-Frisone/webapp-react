import {instance} from "../api/axios";
import { useState } from "react";
import { useNavigate } from "react-router";
import Heading from "../components/ui/Heading";

const initialFormData = {
  title: "",
  author: "",
  abstract: "",
  image: undefined,
};

export default function CreateMovie() {
  const [formData, setFormData] = useState(initialFormData);
  const navigate = useNavigate();

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
      .post(`/movie`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(() => {
        setFormData(initialFormData);
        navigate("/");
      });
  };

  return (
      <div className="bg-white p-4">
        <Heading level={1}>Crea un nuovo Film</Heading>
        <form className="space-y-2 mt-6" onSubmit={handleSubmit}>
          <div>
            <label className="inline-block mb-1" htmlFor="title">
              Titolo
            </label>
            <input
              className="w-full border border-neutral-200 p-2 rounded-sm"
              id="title"
              name="title"
              type="text"
              placeholder="Inserisci il titolo del film"
              value={formData.title}
              onChange={(e) => handleField("title", e.target.value)}
              required
            />
          </div>
          <div>
            <label className="inline-block mb-1" htmlFor="author">
              Autore
            </label>
            <input
              className="w-full border border-neutral-200 p-2 rounded-sm"
              id="author"
              name="author"
              type="text"
              placeholder="Inserisci il nome dell'autore"
              value={formData.author}
              onChange={(e) => handleField("author", e.target.value)}
              required
            />
          </div>
          <div>
            <label className="inline-block mb-1" htmlFor="image">
              Immagine
            </label>
            <input
              className="w-full border border-neutral-200 p-2 rounded-sm"
              id="image"
              name="image"
              type="file"
              accept="image/*"
              placeholder="Inserisci l'immagine"
              onChange={(e) => handleField("image", e.target.files[0])}
              required
            />
          </div>
          <div>
            <label className="inline-block mb-1" htmlFor="abstract">
              Riassunto
            </label>
            <textarea
              className="w-full border border-neutral-200 p-2 rounded-sm"
              id="abstract"
              name="abstract"
              placeholder="Inserisci il riassunto del film"
              rows={5}
              value={formData.abstract}
              onChange={(e) => handleField("abstract", e.target.value)}
              required
              minLength={5}
            ></textarea>
          </div>
          <button type="submit">Invia</button>
        </form>
      </div>
  );
}