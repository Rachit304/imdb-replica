import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Router } from "react-router-dom";
import Header from "./component/header/Header";
import MovieList from "./component/movieList/MovieList";
import Footer from "./component/footer/Footer";
import ScrollToTopButton from "./component/scroll/ScrollToTopButton";

import Home from "./pages/home/Home";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route index element={<Home />} />
          <Route path="movies/:type" element={<MovieList />} />
        </Routes>
      </BrowserRouter>
      <Footer />

      <ScrollToTopButton />
    </div>
  );
}

export default App;
