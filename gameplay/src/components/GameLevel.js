import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import Counter from "./Counter";
import jungleImage from "../images/jungle.png";
import underwaterImage from "../images/underwater.png";
import desertImage from "../images/desert-2.png";
import forestImage from "../images/forest.png";
import bushlandImage from "../images/bushland.png";
import mountainsImage from "../images/mountains.png";

export default function GameLevel({ onScoreSubmit }) {
  const canvasRef = useRef(null);
  const directionRef = useRef({ x: 1, y: 0 });
  const boardWidth = 1200;
  const boardHeight = 600;
  const cellSize = 20;
  const [snake, setSnake] = useState([{ x: 200, y: 200 }]);
  const [food, setFood] = useState({ x: 60, y: 80 });
  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [showText, setShowText] = useState(true);
  const { level } = useParams();
  const backgrounds = {
    jungle: jungleImage,
    underwater: underwaterImage,
    desert: desertImage,
    forest: forestImage,
    bushland: bushlandImage,
    mountains: mountainsImage,
  };
  const backgroundImage = backgrounds[level] || jungleImage;
  const levelColors = {
    jungle: "mediumorchid",
    underwater: "teal",
    desert: "goldenrod",
    forest: "darkgreen",
    bushland: "rosybrown",
    mountains: "navy",
  };
  const currentColor = levelColors[level] || "mediumorchid";

  const initialSpeed = 120;
  const speedIncrease = 1;

  const currentSpeed = () => {
    return initialSpeed - speedIncrease * score;
  };

  const clearBoard = (context) => {
    context.clearRect(0, 0, boardWidth, boardHeight);
  };

  const drawSnake = (context) => {
    context.fillStyle = currentColor;
    snake.forEach((part) => {
      context.fillRect(part.x, part.y, cellSize, cellSize);
      context.strokeStyle = "white";
      context.lineWidth = 2;
      context.strokeRect(part.x, part.y, cellSize, cellSize);
    });
  };

  const drawFood = (context) => {
    context.fillStyle = currentColor;
    context.fillRect(food.x, food.y, cellSize, cellSize);
    context.strokeStyle = "white";
    context.lineWidth = 2;
    context.strokeRect(food.x, food.y, cellSize, cellSize);
  };

  const isGameOver = () => {
    const head = snake[0];
    if (
      head.x < 0 ||
      head.x >= boardWidth ||
      head.y < 0 ||
      head.y >= boardHeight
    ) {
      return true;
    }

    for (let i = 1; i < snake.length; i++) {
      if (head.x === snake[i].x && head.y === snake[i].y) {
        return true;
      }
    }

    return false;
  };

  const updateSnake = () => {
    const newHead = {
      x: snake[0].x + directionRef.current.x * cellSize,
      y: snake[0].y + directionRef.current.y * cellSize,
    };

    const newSnake = [newHead, ...snake];
    if (newHead.x === food.x && newHead.y === food.y) {
      setScore(score + 1);
      generateFood();
    } else {
      newSnake.pop();
    }

    setSnake(newSnake);
  };

  const generateFood = () => {
    setFood({
      x: Math.floor(Math.random() * (boardWidth / cellSize)) * cellSize,
      y: Math.floor(Math.random() * (boardHeight / cellSize)) * cellSize,
    });
  };

  const handleGameOver = async () => {
    const playerName = prompt("Game Over! Enter your name:");
    if (playerName) {
      const scoreDetails = { player_name: playerName, score, level };
      onScoreSubmit(scoreDetails);
    }
    setGameStarted(false);
    setSnake([{ x: 200, y: 200 }]);
    directionRef.current = { x: 1, y: 0 };
    setScore(0);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      switch (e.key) {
        case "Enter":
          if (!gameStarted) {
            setGameStarted(true);
            setShowText(false);
          }
          break;
        case "ArrowUp":
          e.preventDefault();
          if (directionRef.current.y !== 1)
            directionRef.current = { x: 0, y: -1 };
          break;
        case "ArrowDown":
          e.preventDefault();
          if (directionRef.current.y !== -1)
            directionRef.current = { x: 0, y: 1 };
          break;
        case "ArrowLeft":
          e.preventDefault();
          if (directionRef.current.x !== 1)
            directionRef.current = { x: -1, y: 0 };
          break;
        case "ArrowRight":
          e.preventDefault();
          if (directionRef.current.x !== -1)
            directionRef.current = { x: 1, y: 0 };
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [gameStarted]);

  useEffect(() => {
    let blinkInterval = null;

    if (!gameStarted) {
      blinkInterval = setInterval(() => {
        setShowText((prev) => !prev);
      }, 500);
    } else {
      setShowText(false);
    }

    return () => {
      if (blinkInterval) clearInterval(blinkInterval);
    };
  }, [gameStarted]);

  useEffect(() => {
    let gameLoop = null;

    const drawGame = () => {
      if (!gameStarted) {
        const context = canvasRef.current.getContext("2d");
        clearBoard(context);
        if (showText) {
          const text = "Press Enter to Start";
          context.font = "30px 'Press Start 2P', Arial";
          context.fillStyle = currentColor;
          context.textAlign = "center";
          context.textBaseline = "middle";
          context.strokeStyle = "white";
          context.lineWidth = 4;
          const xPosition = boardWidth / 2;
          const yPosition = boardHeight / 2;
          context.strokeText(text, xPosition, yPosition);
          context.fillText(text, xPosition, yPosition);
        }
        return;
      }

      updateSnake();

      if (isGameOver()) {
        handleGameOver();
      } else {
        const context = canvasRef.current.getContext("2d");
        clearBoard(context);
        drawSnake(context);
        drawFood(context);
      }
    };

    if (gameStarted) {
      const speed = currentSpeed();
      gameLoop = setInterval(drawGame, Math.max(speed, 20));
    } else {
      drawGame();
    }

    return () => {
      if (gameLoop) clearInterval(gameLoop);
    };
  }, [gameStarted, snake, food, score, showText, currentColor]);

  return (
    <div
      id="canvasContainer"
      style={{
        width: "1200px",
        height: "600px",
        position: "relative",
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "100% 100%",
        backgroundRepeat: "no-repeat",
      }}
    >
      <canvas
        ref={canvasRef}
        width={boardWidth}
        height={boardHeight}
        className="canvas"
      />
      <Counter score={score} />
    </div>
  );
}
