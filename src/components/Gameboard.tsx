
import type { CellType } from "../types/map";

type GameBoardProps = {
  map: CellType[][];
};

export default function GameBoard({ map }: GameBoardProps) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${map[0].length}, 32px)`,
        gridTemplateRows: `repeat(${map.length}, 32px)`,
      }}
    >
      {map.map((row, rowIndex) =>
  row.map((cell, colIndex) => {
    let backgroundColor = "black";
    if (cell === 1) backgroundColor = "blue";
    else if (cell === 2) backgroundColor = "white";
    else if (cell === 3) backgroundColor = "yellow"; // Pac-Man
    if (cell === 4) backgroundColor = "red";


    return (
      <div
        key={`${rowIndex}-${colIndex}`}
        style={{
          width: 32,
          height: 32,
          backgroundColor,
          border: "1px solid #222",
        }}
      />
    );
  })
)}

    </div>
  );
}
