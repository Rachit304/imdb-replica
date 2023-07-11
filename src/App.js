
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './component/header/Header'
function App() {
  return (
    <div className="App">
      <Header />

      <BrowserRouter>
        <Routes>
          <Route index element={<h1>Rachit</h1>} />
          <Route path="movies/:id" element={<h1>Movie Detail Page</h1>} />
          <Route path="movies/:type" element={<h1>Movie List Page</h1>} />
          <Route path='/*' element={<h1>Error </h1>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
