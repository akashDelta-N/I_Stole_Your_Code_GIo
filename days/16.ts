import { Direction, Matrix } from '../extension-methods.ts';

type Beam = { direction: Direction; xy: string };

const processBeam = (matrix: Matrix, startBeam: Beam) => {
	const beams: Beam[] = [startBeam];
	const visited = new Set<string>();
	const visitedFromDirection = new Set<string>();
	const mirrorSlantedRight: Record<string, Direction> = { '↑': '→', '↓': '←', '←': '↓', '→': '↑' };
	const mirrorSlantedLeft: Record<string, Direction> = { '↑': '←', '↓': '→', '←': '↑', '→': '↓' };
	while (beams.length) {
		const { direction, xy: location } = beams.shift()!;
		const neighbours = Object.entries(matrix.neighboursByString(location, direction));
		if (!neighbours.length) continue;
		const [xy, tileValue] = neighbours[0];
		if (!tileValue || visitedFromDirection.has(xy + direction)) continue;
		visited.add(xy);
		visitedFromDirection.add(xy + direction);
		const findNextDirections: Record<string, () => Direction[]> = {
			'.': () => [direction],
			'|': () => '↑↓'.includes(direction) ? [direction] : ['↑', '↓'],
			'-': () => '→←'.includes(direction) ? [direction] : ['→', '←'],
			'/': () => [mirrorSlantedRight[direction]],
			'\\': () => [mirrorSlantedLeft[direction]],
		};
		findNextDirections[tileValue]().forEach((direction) => beams.push({ direction, xy }));
	}
	return visited.size;
};

export const p1 = (input: string): number => {
	const matrix = new Matrix(input.splitRows().map((x) => [...x]));
	return processBeam(matrix, { direction: '→', xy: 'x-1y0' });
};

export const p2 = (input: string): number => {
	const matrix = new Matrix(input.splitRows().map((x) => [...x]));
	const startBeams: Beam[] = [];
	for (let x = 0; x < matrix.width; x++) {
		startBeams.push({ direction: '↓', xy: `x${x}y-1` });
		startBeams.push({ direction: '↑', xy: `x${x}y${matrix.length}` });
	}
	for (let y = 0; y < matrix.length; y++) {
		startBeams.push({ direction: '→', xy: `x-1y${y}` });
		startBeams.push({ direction: '←', xy: `x${matrix.width}y${y}` });
	}
	return Math.max(...startBeams.map((startBeam) => processBeam(matrix, startBeam)));
};
