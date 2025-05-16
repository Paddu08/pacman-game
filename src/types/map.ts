
export type CellType = 0 | 1 | 2 | 3;
// 0 = empty, 1 = wall, 2 = dot, 3 = Pac-Man

export const simpleMap: CellType[][] = [
	[1, 1, 1, 1, 1],
	[1, 2, 0, 2, 1],
	[1, 0, 3, 0, 1], // Pac-Man starts at (2, 2)
	[1, 2, 0, 2, 1],
	[1, 1, 1, 1, 1],
];
