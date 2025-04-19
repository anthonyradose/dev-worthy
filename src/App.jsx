import React from "react";
import { Routes, Route } from "react-router-dom";

import "./App.css";
import NavBar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import QuoteCard from "./components/QuoteCard.jsx";
import Credits from "./pages/Credits.jsx";
import Favourites from "./pages/Favourites.jsx";

function App() {
  return (
    <>
      <NavBar />
      <main className="container-main">
        <Routes>
          <Route path="/" element={<QuoteCard />} />
          <Route path="about" element={<Credits />} />
          <Route path="favourites" element={<Favourites />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
