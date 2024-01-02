import React, { useEffect, useState } from "react";

function Highscores() {
  const [scores, setScores] = useState([]);

  useEffect(() => {
    const fetchScores = async () => {
      try {
        const response = await fetch("https://snake-c8t5.onrender.com/scores");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setScores(data);
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
      }
    };

    fetchScores();
  }, []);

  return (
    <div className="highscores-container">
      <h2>High Scores</h2>
      <ul className="highscores-list">
        {scores.map((score, index) => (
          <li key={index} className="highscore-entry">
            <span className="player-name">{score.player_name}</span>
            <span className="player-score">{score.score}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Highscores;
