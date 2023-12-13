import '../extension-methods.ts';

type SurroundingPatterns = { next: string[][]; prev: string[][] };

const processInput = (input: string, lineOfReflection: (pattern: string[][]) => number | undefined) =>
	input.splitRows(2)
		.map((pattern) => pattern.splitRows().map((row) => [...row]))
		.reduce((acc, pattern) => {
			const result = lineOfReflection(pattern);
			if (result) return acc + 100 * result;
			pattern = pattern[0].map((_, i) => pattern.map((row) => row[i]));
			return acc + lineOfReflection(pattern)!;
		}, 0);

const getSurroundingPatterns = (pattern: string[][], index: number): SurroundingPatterns => {
	const next = pattern.slice(index, index * 2).reverse();
	const prev = pattern.slice(0, index).slice(-next.length);
	return { next, prev };
};

const lineFound = ({ next, prev }: SurroundingPatterns) =>
	prev.every((row, y) => row.every((cell, x) => cell === next[y][x]));

export const p1 = (input: string): number =>
	processInput(input, (pattern) => {
		for (let i = 1; i < pattern.length; i++) {
			if (lineFound(getSurroundingPatterns(pattern, i))) return i;
		}
	});

export const p2 = (input: string): number =>
	processInput(input, (pattern) => {
		for (let i = 1; i < pattern.length; i++) {
			const { next, prev } = getSurroundingPatterns(pattern, i);
			const fixSmudge = (x: number, y: number) => prev[y][x] = { ['.']: '#', ['#']: '.' }[prev[y][x]]!;
			for (const prevY of prev.keys()) {
				for (const prevX of prev[prevY].keys()) {
					fixSmudge(prevX, prevY);
					if (lineFound({ next, prev })) return i;
					fixSmudge(prevX, prevY);
				}
			}
		}
	});
