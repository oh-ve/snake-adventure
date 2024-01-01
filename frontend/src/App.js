import "./App.css";
import Jungle from "./components/levels/Jungle";
import Underwater from "./components/levels/Underwater";
import Bushland from "./components/levels/Bushland";
import Desert from "./components/levels/Desert";
import Mountains from "./components/levels/Mountains";
import Forest from "./components/levels/Forest";
import { Route, Routes, Link, Navigate } from "react-router-dom";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="App">
      <h1>Snake Adventure</h1>
      <div className="level-wrapper">
        <div className="level-container">
          <Routes>
            <Route path="/" element={<Navigate to="/jungle" />} />

            <Route path="/jungle" element={<Jungle />} />
            <Route path="/underwater" element={<Underwater />} />
            <Route path="/bushland" element={<Bushland />} />
            <Route path="/desert" element={<Desert />} />
            <Route path="/mountains" element={<Mountains />} />
            <Route path="/forest" element={<Forest />} />
          </Routes>
        </div>
        <div className="button-container">
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
