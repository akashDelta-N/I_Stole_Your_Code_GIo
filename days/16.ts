import { Direction, Matrix } from '../extension-methods.ts';

type Beam = { direction: Direction; xy: string };

const processBeam = (matrix: Matrix, startBeam: Beam) => {
	const beams: Beam[] = [startBeam];
	const visited = new Set<string>([]);
	const visitedFromDirection = new Set<string>([]);
	while (beams.length) {
		const { direction, xy } = beams.shift()!;
		const neighbours = Object.entries(matrix.neighboursByString(xy, direction));
		if (!neighbours.length) continue;
		const [next, tileValue] = neighbours[0];
		if (!tileValue || visitedFromDirection.has(`${next}-${direction}`)) continue;
		visitedFromDirection.add(`${next}-${direction}`);
		visited.add(next);
		switch (tileValue) {
			case '.': {
				beams.push({ direction: direction, xy: next });
				break;
			}
			case '/': {
				const dirs: Record<string, Direction> = { 'up': 'right', 'down': 'left', 'left': 'down', 'right': 'up' };
				beams.push({ direction: dirs[direction], xy: next });
				break;
			}
			case '\\': {
				const dirs: Record<string, Direction> = { 'up': 'left', 'down': 'right', 'left': 'up', 'right': 'down' };
				beams.push({ direction: dirs[direction], xy: next });
				break;
			}
			case '|': {
				if (direction === 'up' || direction === 'down') {
					beams.push({ direction: direction, xy: next });
					break;
				}
				beams.push({ direction: 'up', xy: next });
				beams.push({ direction: 'down', xy: next });
				break;
			}
			case '-': {
				if (direction === 'left' || direction === 'right') {
					beams.push({ direction: direction, xy: next });
					break;
				}
				beams.push({ direction: 'left', xy: next });
				beams.push({ direction: 'right', xy: next });
				break;
			}
		}
	}
	return visited.size;
};

export const p1 = (input: string): number => {
	const matrix = new Matrix(input.splitRows().map((x) => [...x]));
	return processBeam(matrix, { direction: 'right', xy: 'x-1y0' });
};

export const p2 = (input: string): number => {
	const matrix = new Matrix(input.splitRows().map((x) => [...x]));
	const startBeams: Beam[] = [];
	for (let x = 0; x < matrix.width; x++) {
		startBeams.push({ direction: 'down', xy: `x${x}y-1` });
		startBeams.push({ direction: 'up', xy: `x${x}y${matrix.length}` });
	}
	for (let y = 0; y < matrix.length; y++) {
		startBeams.push({ direction: 'right', xy: `x-1y${y}` });
		startBeams.push({ direction: 'left', xy: `x${matrix.width}y${y}` });
	}
	return Math.max(...startBeams.map((startBeam) => processBeam(matrix, startBeam)));
};
