
export type CellType = 0 | 1 | 2 | 3 | 4;
// 0 = empty, 1 = wall, 2 = dot, 3 = Pac-Man, 4 = ghost

export const simpleMap: CellType[][] = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 2, 0, 2, 1, 2, 0, 2, 1],
  [1, 0, 1, 0, 0, 0, 1, 0, 1],
  [1, 2, 0, 1, 0, 1, 0, 2, 1],   // changed (3,4) from 1 to 0
  [1, 0, 0, 0, 3, 0, 0, 0, 1],   // changed (4,3) and (4,5) to 0
  [1, 2, 0, 1, 0, 1, 0, 2, 1],   // changed (5,4) from 1 to 0
  [1, 0, 1, 0, 0, 0, 1, 0, 1],
  [1, 2, 0, 2, 1, 2, 0, 4, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1],
];