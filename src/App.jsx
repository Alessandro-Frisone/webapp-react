import { BrowserRouter, Routes, Route } from "react-router";
// Layouts
import DefaultLayout from "./layouts/DefaultLayout";
import { AlertProvider } from "./contexts/AlertContext";
// Pages
import HomePage from "./pages/Homepage";
import MoviePage from "./pages/Moviepage";
import PageNotFound from "./pages/PageNotFound";
import CreateMovie from "./pages/CreateMovie";

export default function App() {
  return (
    <AlertProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<DefaultLayout />}>
            <Route index path="/" element={<HomePage />} />
            <Route path="/movie/:id" element={<MoviePage />} />
            <Route path="/movie/create" element={<CreateMovie />} />
            <Route path="*" element={<PageNotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AlertProvider>
  );
}