import "./App.css";
import { useLocation } from "react-router-dom";
import GameLevel from "./components/GameLevel";
import Highscores from "./components/Highscores";
import { Route, Routes, Link, Navigate } from "react-router-dom";
import Footer from "./components/Footer";

function App() {
  const location = useLocation();
  const currentPath = location.pathname;
  const isCurrentPath = (path) => currentPath.includes(path);

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
          {/*      <h2>Level</h2> */}
          <Link to="/jungle">
            <button
              id="jungle-button"
              className={isCurrentPath("/jungle") ? "highlight" : ""}
            >
              Jungle
            </button>
          </Link>
          <Link to="/underwater">
            <button
              id="underwater-button"
              className={isCurrentPath("/underwater") ? "highlight" : ""}
            >
              Underwater{" "}
            </button>
          </Link>
          <Link to="/desert">
            <button
              id="desert-button"
              className={isCurrentPath("/desert") ? "highlight" : ""}
            >
              Desert
            </button>
          </Link>
          <Link to="/forest">
            <button
              id="forest-button"
              className={isCurrentPath("/forest") ? "highlight" : ""}
            >
              Forest
            </button>
          </Link>
          <Link to="/bushland">
            <button
              id="bushland-button"
              className={isCurrentPath("/bushland") ? "highlight" : ""}
            >
              Bushland
            </button>
          </Link>
          <Link to="/mountains">
            <button
              id="mountains-button"
              className={isCurrentPath("/mountains") ? "highlight" : ""}
            >
              Mountains
            </button>
          </Link>
        </div>
      </div>
      <Highscores />
      <Footer />{" "}
    </div>
  );
}

export default App;
