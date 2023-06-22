import React from "react";
import './App.css';
import Header from './components/Header';
import './components/Search.css';
import './components/MoviesDisplay.css';
import Search from "./components/Search";
// import SearchBar from "./components/SearchBar";
import { BrowserRouter as Router, Route,Routes } from "react-router-dom";
import MoviesDetailsPage from "./components/MoviesDetailsPage";


const App = () => {

  return (
      <Router>
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Search/>} />
        {/* <Route path="/search" element={<Search />} /> */}
        <Route path="/movies/:id" element={<MoviesDetailsPage />} />
        {/* <Route path="*" element={<NotFoundPage />} /> */}
      </Routes>
    </div>
  </Router>
  );
}

export default App;
