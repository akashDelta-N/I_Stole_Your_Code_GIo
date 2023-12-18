import { Direction, Matrix } from '../extension-methods.ts';

type Beam = { direction: Direction; location: string };

const processBeam = (matrix: Matrix, startBeam: Beam) => {
	const beams: Beam[] = [startBeam];
	const visited = new Set<string>();
	const visitedFromDirection = new Set<string>();
	const mirrorSlantedRight: Record<string, Direction> = { '↑': '→', '↓': '←', '←': '↓', '→': '↑' };
	const mirrorSlantedLeft: Record<string, Direction> = { '↑': '←', '↓': '→', '←': '↑', '→': '↓' };
	while (beams.length) {
		const { direction, location: currentLocation } = beams.shift()!;
		const neighbours = Object.entries(matrix.neighboursByString(currentLocation, direction));
		if (!neighbours.length) continue;
		const [location, tileValue] = neighbours[0];
		if (!tileValue || visitedFromDirection.has(location + direction)) continue;
		visited.add(location);
		visitedFromDirection.add(location + direction);
		const findNextDirections: Record<string, () => Direction[]> = {
			'.': () => [direction],
			'|': () => '↑↓'.includes(direction) ? [direction] : ['↑', '↓'],
			'-': () => '→←'.includes(direction) ? [direction] : ['→', '←'],
			'/': () => [mirrorSlantedRight[direction]],
			'\\': () => [mirrorSlantedLeft[direction]],
		};
		findNextDirections[tileValue]().forEach((direction) => beams.push({ direction, location }));
	}
	return visited.size;
};

export const p1 = (input: string): number => {
	const matrix = Matrix.fromInput(input);
	return processBeam(matrix, { direction: '→', location: 'x-1y0' });
};

export const p2 = (input: string): number => {
	const matrix = Matrix.fromInput(input);
	const startBeams: Beam[] = [];
	for (let x = 0; x < matrix.width; x++) {
		startBeams.push({ direction: '↓', location: `x${x}y-1` });
		startBeams.push({ direction: '↑', location: `x${x}y${matrix.length}` });
	}
	for (let y = 0; y < matrix.length; y++) {
		startBeams.push({ direction: '→', location: `x-1y${y}` });
		startBeams.push({ direction: '←', location: `x${matrix.width}y${y}` });
	}
	return Math.max(...startBeams.map((startBeam) => processBeam(matrix, startBeam)));
};
