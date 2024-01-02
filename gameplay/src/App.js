import { useState } from "react";
import "./App.css";
import GameLevel from "./components/GameLevel";
import { Route, Routes, Link, Navigate } from "react-router-dom";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="App">
      <h1>Snake Adventure</h1>
      <div className="level-wrapper">
        <div className="level-container">
          <Routes>
            <Route path="/:level" element={<GameLevel />} />
            <Route path="/" element={<Navigate to="/jungle" />} />
          </Routes>
        </div>
        <div className="button-container">
          <h2>Level</h2>
          <Link to="/jungle">
            <button id="jungle-button">Jungle</button>
          </Link>
          <Link to="/underwater">
            <button id="underwater-button">Underwater</button>
          </Link>
          <Link to="/desert">
            <button id="desert-button">Desert</button>
          </Link>
          <Link to="/forest">
            <button id="forest-button">Forest</button>
          </Link>
          <Link to="/bushland">
            <button id="bushland-button">Bushland</button>
          </Link>
          <Link to="/mountains">
            <button id="mountains-button">Mountains</button>
          </Link>
        </div>
      </div>
      <Footer />{" "}
    </div>
  );
}

export default App;
