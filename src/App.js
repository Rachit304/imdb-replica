
import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './component/header/Header'
import Home from './pages/home/Home'
function App() {
  return (
    <div className="App">
     

      <BrowserRouter>
      <Header />
      <Header />
        <Routes>
          <Route index element={<Home />} />
          <Route path="movie/:id" element={<MovieDetail/>} />
          <Route path="movies/:type" element={<MovieList/>} />
          <Route path='/*' element={<h1>Error </h1>} />
        </Routes>
        
      </BrowserRouter>
      <Footer/>
    
        <ScrollToTopButton/>
    </div>
  );
}

export default App;
