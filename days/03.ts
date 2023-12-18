import { Matrix } from '../extension-methods.ts';

const checkNeighbours = (matrix: string[], x: number, y: number, regex: RegExp): [boolean, string] => {
	const neighbours = new Matrix(matrix.map((row) => [...row])).neighbours(x, y);
	const coordinates = Object.keys(neighbours)
		.find((key) => neighbours[key] && regex.test(neighbours[key]));
	return [!!coordinates, coordinates ?? `x${x}y${y}`];
};

export const p1 = (input: string): number => {
	const matrix = input.splitRows();
	const parts: Array<number> = [];
	matrix.forEach((row, y) => {
		row.matchMap(/\d+/g, ({ 0: part, index }) => {
			for (let i = index ?? 0, x = i; x < i + part.length; x++) {
				const [hasPart] = checkNeighbours(matrix, x, y, /^((?![.\d\s]).)*$/);
				if (!hasPart) continue;
				parts.push(Number(part));
				break;
			}
		});
	});
	return parts.sum();
};

export const p2 = (input: string): number => {
	const matrix = input.splitRows();
	const gears: Record<string, Array<number>> = {};
	matrix.forEach((row, y) => {
		row.matchMap(/\d+/g, ({ 0: part, index }) => {
			for (let i = index ?? 0, x = i; x < i + part.length; x++) {
				const [hasPart, coordinates] = checkNeighbours(matrix, x, y, /^\*$/);
				if (!hasPart) continue;
				(gears[coordinates] ??= []).push(Number(part));
				break;
			}
		});
	});
	return Object.values(gears)
		.filter((gear) => gear.length === 2)
		.map((gear) => gear.prod())
		.sum();
};
