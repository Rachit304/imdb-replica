
import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './component/header/Header'
import MovieList from './component/movieList/MovieList';
import Footer from './component/footer/Footer';
import ScrollToTopButton from './component/scroll/ScrollToTopButton';
import MovieDetail from './component/movieDetail/MovieDetail';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Header />
        <Routes>
          <Route index element={<h1>Rachit</h1>} />
          <Route path="movie/:id" element={<MovieDetail/>} />
          <Route path="movies/:type" element={<MovieList />} />
          <Route path='/*' element={<h1>Error </h1>} />
        </Routes>
        
      </BrowserRouter>
      <Footer/>
    
        <ScrollToTopButton/>
    </div>
  );
}

export default App;
