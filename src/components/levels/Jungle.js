import React, { useEffect, useRef, useState } from "react";
import Counter from "../Counter";
import jungle from "../../images/jungle.png";

export default function Jungle() {
  const canvasRef = useRef(null);
  const directionRef = useRef({ x: 1, y: 0 });
  const boardWidth = 1300;
  const boardHeight = 600;
  const cellSize = 20;
  const [snake, setSnake] = useState([{ x: 200, y: 200 }]);
  const [food, setFood] = useState({ x: 60, y: 80 });
  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [showText, setShowText] = useState(true);

  const clearBoard = (context) => {
    context.clearRect(0, 0, boardWidth, boardHeight); // Use clearRect to clear the canvas
  };

  const drawSnake = (context) => {
    context.fillStyle = "mediumorchid";
    snake.forEach((part) => {
      context.fillRect(part.x, part.y, cellSize, cellSize);
      context.strokeStyle = "white";
      context.lineWidth = 2;
      context.strokeRect(part.x, part.y, cellSize, cellSize);
      context.lineWidth = 1;
    });
  };

  const drawFood = (context) => {
    context.fillStyle = "mediumorchid";
    context.fillRect(food.x, food.y, cellSize, cellSize);
    context.strokeStyle = "white";
    context.lineWidth = 2;
    context.strokeRect(food.x, food.y, cellSize, cellSize);
    context.lineWidth = 1;
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

  useEffect(() => {
    const handleKeyDown = (e) => {
      switch (e.key) {
        case "Enter":
          if (!gameStarted) {
            setGameStarted(true);
          }
          break;
        case "ArrowUp":
          if (directionRef.current.y !== 1)
            directionRef.current = { x: 0, y: -1 };
          break;
        case "ArrowDown":
          if (directionRef.current.y !== -1)
            directionRef.current = { x: 0, y: 1 };
          break;
        case "ArrowLeft":
          if (directionRef.current.x !== 1)
            directionRef.current = { x: -1, y: 0 };
          break;
        case "ArrowRight":
          if (directionRef.current.x !== -1)
            directionRef.current = { x: 1, y: 0 };
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowText((prev) => !prev);
    }, 500);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const drawGame = () => {
      if (!gameStarted) {
        const context = canvasRef.current.getContext("2d");
        clearBoard(context);
        if (showText) {
          const text = "Press Enter to Start";
          context.font = "30px 'Press Start 2P', Arial";
          context.fillStyle = "mediumorchid";
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
        alert(`Game Over! Your score: ${score}`);
        setGameStarted(false);
        setSnake([{ x: 200, y: 200 }]);
        directionRef.current = { x: 1, y: 0 };
        setScore(0);
        return;
      }

      const context = canvasRef.current.getContext("2d");
      clearBoard(context);
      drawSnake(context);
      drawFood(context);
    };

    const gameLoop = setInterval(drawGame, 100);
    return () => clearInterval(gameLoop);
  }, [gameStarted, snake, food, score, showText]);

  return (
    <>
      <div
        id="canvasContainer"
        style={{
          width: "1300px",
          height: "600px",
          position: "relative",
          backgroundImage: `url(${jungle})`,
          backgroundSize: "100% 100%", // Adjust the background size property
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
    </>
  );
}
