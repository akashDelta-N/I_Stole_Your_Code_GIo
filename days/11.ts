import '../extension-methods.ts';

export const p1 = (input: string, factor = 2): number => {
	const space: string[][] = input
		.splitRows()
		.map((line) => [...line])
		.map((row) => row.every((cell) => cell !== '#') ? row.map(() => 'X') : row)
		.map((row, _, space) => row.map((cell, x) => space.every((r) => r[x] !== '#') ? 'X' : cell));
	return space
		.reduce((acc, row, y) => {
			const entries = row.map((cell, x) => cell === '#' ? [x, y] : []).filter(Boolean);
			acc.push(...entries);
			return acc;
		}, new Array<number[]>())
		.reduce((acc, [x1, y1], index, galaxies) => {
			galaxies.slice(0, index).forEach(([x2, y2]) => {
				for (let x = Math.min(x1, x2); x < Math.max(x1, x2); x++) {
					acc += space[y1][x] === 'X' ? factor : 1;
				}
				for (let y = Math.min(y1, y2); y < Math.max(y1, y2); y++) {
					acc += space[y][x1] === 'X' ? factor : 1;
				}
			});
			return acc;
		}, 0);
};

export const p2 = (input: string): number => p1(input, 1_000_000);
