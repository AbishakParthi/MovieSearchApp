import { createContext, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { FavouriteMovie } from "./FavouriteMovie";
import { MovieSearchApp } from "./MovieSearchApp";
export const favContext = createContext();

function App() {
  const [fav, setFav] = useState([]);
  const [movies, setMovies] = useState([]);

  return (
    <>
    <BrowserRouter>
    <div className="container">
      <ToastContainer theme="dark" position="top-center"/>
      <Routes>
        <Route path="/" element={<MovieSearchApp fav={fav} setFav={setFav} movies={movies} setMovies={setMovies}/>}/>
        <Route path="/FavouriteMovie" element={<FavouriteMovie fav={fav} setFav={setFav}/>}/>
      </Routes>
    </div>
    </BrowserRouter>
    </>
  )
}

export default App
