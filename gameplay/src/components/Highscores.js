import React, { useEffect, useState } from "react";

function Highscores({ newScore, scores, newScoreId }) {
  return (
    <div className="highscores-container">
      <h2>High Scores</h2>
      <table className="highscores-table">
        <th id="header-name">Player</th>
        <th id="header-score">Score</th>
        <tbody>
          {scores
            .sort((a, b) => b.score - a.score)
            .map((score, index) => (
              <tr
                key={score.id}
                className={`${newScoreId === score.id ? "highlighted" : ""} ${
                  index % 2 === 0 ? "even" : "odd"
                }`}
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
