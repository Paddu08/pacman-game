import { useEffect, useState } from "react";
import GameBoard from "./components/Gameboard";
import { simpleMap as initialMap, type CellType } from "./types/map";

type Position = { row: number; col: number };

type GameStatus = "playing" | "won" | "lost";



function manhattanDistance(pos1: Position, pos2: Position): number {
  return Math.abs(pos1.row - pos2.row) + Math.abs(pos1.col - pos2.col);
}

function App() {
  const [map, setMap] = useState<CellType[][]>(initialMap);
  const [score, setScore] = useState(0);
  const [gameStatus, setGameStatus] = useState<GameStatus>("playing");


  const [pacmanPos, setPacmanPos] = useState<Position>({ row: 4, col: 4 });
  const [ghostPos, setGhostPos] = useState<Position>({ row: 7, col: 7 });

  // Pac-Man movement handler
  useEffect(() => {
    if (gameStatus !== "playing") return;

    const handleKeyDown = (e: KeyboardEvent) => {
      const { row, col } = pacmanPos;
      let newRow = row;
      let newCol = col;

      if (e.key === "ArrowUp") newRow--;
      else if (e.key === "ArrowDown") newRow++;
      else if (e.key === "ArrowLeft") newCol--;
      else if (e.key === "ArrowRight") newCol++;

      if (map[newRow][newCol] === 1) return;

      const newMap = map.map((row) => [...row]);

      newMap[row][col] = 0;

      if (map[newRow][newCol] === 2) {
        setScore((prev) => prev + 10);
      }

      newMap[newRow][newCol] = 3;
        const dotsLeft = newMap.flat().some(cell => cell === 2);
  if (!dotsLeft) {
      setGameStatus("won");

    alert("🎉 You Win! All dots collected!");
    // You can reset the game or add more logic here
  }

      setMap(newMap);
      setPacmanPos({ row: newRow, col: newCol });
    };

    

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [pacmanPos, map]);

  // Ghost movement
  useEffect(() => {
    if (gameStatus !== "playing") return;

    const interval = setInterval(() => {
      const directions = [
        { row: -1, col: 0 },
        { row: 1, col: 0 },
        { row: 0, col: -1 },
        { row: 0, col: 1 },
      ];

      const { row, col } = ghostPos;

      const validMoves = directions.filter((dir) => {
        const newRow = row + dir.row;
        const newCol = col + dir.col;
        return map[newRow][newCol] !== 1;
      });

      if (validMoves.length === 0) return;

      let bestMove = validMoves[0];
      let bestDist = manhattanDistance(
        { row: row + bestMove.row, col: col + bestMove.col },
        pacmanPos
      );

      for (const move of validMoves) {
        const dist = manhattanDistance(
          { row: row + move.row, col: col + move.col },
          pacmanPos
        );
        if (dist < bestDist) {
          bestMove = move;
          bestDist = dist;
        }
      }

      const newRow = row + bestMove.row;
      const newCol = col + bestMove.col;

      if (map[newRow][newCol] === 3) {
        alert("💀 Game Over! The ghost caught you!");
          setGameStatus("lost");

        clearInterval(interval);
        return;
      }

      const newMap = map.map((row) => [...row]);
      newMap[row][col] = 0;
      newMap[newRow][newCol] = 4;

      setMap(newMap);
      setGhostPos({ row: newRow, col: newCol });
    }, 1000);

    return () => clearInterval(interval);
  }, [ghostPos, map, pacmanPos]);

  return (
    <div className="p-5 bg-black min-h-screen flex flex-col items-center">
      <h1 className="text-yellow-400 text-4xl font-bold mb-3">Pac-Man</h1>
      <p className="text-white text-lg mb-5">Score: {score}</p>
      <GameBoard map={map} />
    </div>
  );
}

export default App;
