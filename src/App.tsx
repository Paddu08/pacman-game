
import { useEffect, useState } from "react";
import GameBoard from "./components/Gameboard";
import { simpleMap as initialMap, type CellType } from "./types/map";

type Position = { row: number; col: number };

function App() {
  const [map, setMap] = useState<CellType[][]>(initialMap);
  const [pacmanPos, setPacmanPos] = useState<Position>({ row: 2, col: 2 });

  // Movement handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const { row, col } = pacmanPos;
      let newRow = row;
      let newCol = col;

      if (e.key === "ArrowUp") newRow--;
      else if (e.key === "ArrowDown") newRow++;
      else if (e.key === "ArrowLeft") newCol--;
      else if (e.key === "ArrowRight") newCol++;

      // Prevent moving into walls
      if (map[newRow][newCol] === 1) return;

      const newMap = map.map((row) => [...row]); // Deep copy

      // Clear old position
      newMap[row][col] = 0;

      // Eat dot if present
      if (map[newRow][newCol] === 2) {
        // could add score logic here
      }

      // Set Pac-Man's new position
      newMap[newRow][newCol] = 3;

      setMap(newMap);
      setPacmanPos({ row: newRow, col: newCol });
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [pacmanPos, map]);

  return (
    <div style={{ padding: 20 }}>
      <h1 style={{ color: "yellow" }}>Pac-Man</h1>
      <GameBoard map={map} />
    </div>
  );
}

export default App;
