import React, { useEffect, useState } from "react";

function Highscores({ newScore, scores, newScoreId }) {
  return (
    <div className="highscores-container">
      <h2>High Scores</h2>
      <table className="highscores-table">
        <thead>
          <tr>
            <th id="header-name">Name</th>
            <th id="header-score">Score</th>
          </tr>
        </thead>
        <tbody>
          {scores
            .sort((a, b) => b.score - a.score)
            .map((score, index) => (
              <tr
                key={score.id}
                className={newScoreId === score.id ? "highlighted" : ""}
              >
                <td className="player-name">{score.player_name}</td>
                <td className="player-score">{score.score}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default Highscores;
