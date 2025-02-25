import axios from "axios";
const API_URL = "http://localhost:3001";

// Crea un'istanza di Axios con configurazione personalizzata
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Funzione per ottenere tutti i film
export const instance = axios.create({
  baseURL: "http://localhost:3001", // Assicurati che sia l'URL corretto del tuo server
  headers: {
    "Content-Type": "application/json",
  },
});

// Funzione per ottenere un film specifico per ID
export const getMovieById = async (id) => {
  try {
    const response = await apiClient.get(`/movie/${id}`);
    return response.data;
  } catch (error) {
    console.error(Error);
    throw error;
  }
};
