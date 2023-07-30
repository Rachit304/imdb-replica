import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Header from "./component/header/Header";
import MovieList from "./component/movieList/MovieList";
import Footer from "./component/footer/Footer";
import ScrollToTopButton from "./component/scroll/ScrollToTopButton";
import ScrollToTop from "./component/scroll/ScrollToTop";
import Home from "./component/home/Home";
import Form from "./component/form/Form";
import Login from "./component/login/Login";

import MovieDetail from "./component/movieDetail/MovieDetail";


function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <ScrollToTop />
        <Routes>
          <Route index element={<Home />} />
          <Route path="/register" element={<Form />} />
          <Route path="/login" element={<Login />} />
          <Route path="/movies/:type" element={<MovieList />} />
          <Route path="/movie/:id" element={<MovieDetail />} />

        </Routes>
      </BrowserRouter>
      <Footer />
      <ScrollToTopButton />
    </div>
  );
}

export default App;
