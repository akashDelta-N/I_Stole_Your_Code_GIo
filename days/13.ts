import '../extension-methods.ts';

const processInput = (input: string, lineOfReflection: (pattern: string[][]) => number | undefined) =>
	input.splitRows(2)
		.map((pattern) => pattern.splitRows().map((row) => [...row]))
		.reduce((sum, pattern) => {
			const result = lineOfReflection(pattern);
			if (result) return sum + 100 * result;
			pattern = pattern[0].map((_, i) => pattern.map((row) => row[i]));
			return sum + lineOfReflection(pattern)!;
		}, 0);

const lineFound = (prev: string[][], next: string[][]) =>
  prev.every((row, y) => row.every((cell, x) => cell === next[y][x]));

export const p1 = (input: string): number =>
	processInput(input, (pattern) => {
		for (let i = 1; i < pattern.length; i++) {
			const next = pattern.slice(i, 2 * i).reverse();
			const prev = pattern.slice(0, i).slice(-next.length);
			if (lineFound(prev, next)) return i;
		}
	});

export const p2 = (input: string): number =>
	processInput(input, (pattern) => {
		for (let i = 1; i < pattern.length; i++) {
			const next = pattern.slice(i, i * 2).reverse();
			const prev = pattern.slice(0, i).slice(-next.length);
			const fixSmudge = (y: number, x: number) => prev[y][x] = { ['.']: '#', ['#']: '.' }[prev[y][x]]!;
			for (const prevY of prev.keys()) {
				for (const prevX of prev[prevY].keys()) {
					fixSmudge(prevY, prevX);
					if (lineFound(prev, next)) return i;
					fixSmudge(prevY, prevX);
				}
			}
		}
	});
