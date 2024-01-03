import "./App.css";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import GameLevel from "./components/GameLevel";
import Highscores from "./components/Highscores";
import { Route, Routes, Link, Navigate } from "react-router-dom";
import Footer from "./components/Footer";

function App() {
  const location = useLocation();
  const currentPath = location.pathname;
  const isCurrentPath = (path) => currentPath.includes(path);
  const [scores, setScores] = useState([]);
  const [newScore, setNewScore] = useState(null);
  const [newScoreId, setNewScoreId] = useState(null);

  useEffect(() => {
    fetchScores();
  }, []);

  const fetchScores = async () => {
    try {
      const response = await fetch("https://snake-c8t5.onrender.com/scores");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setScores(data);
    } catch (error) {
      console.error("Error fetching scores:", error);
    }
  };

  const handleScoreSubmit = async (submittedScore) => {
    try {
      const response = await fetch(
        "https://snake-c8t5.onrender.com/submit-score",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(submittedScore),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const newScore = await response.json();
      setScores((currentScores) => [...currentScores, newScore]);
      setNewScoreId(newScore.id);
    } catch (error) {
      console.error("There was a problem with submitting the score:", error);
    }
  };

  return (
    <div className="App">
      <h1>Snake Adventure</h1>
      <div className="level-wrapper">
        <div className="level-container">
          <Routes>
            <Route
              path="/:level"
              element={<GameLevel onScoreSubmit={handleScoreSubmit} />}
            />
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
      <Highscores scores={scores} newScore={newScore} newScoreId={newScoreId} />
      <Footer />{" "}
    </div>
  );
}

export default App;
