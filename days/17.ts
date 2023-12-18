import { Direction, Matrix } from '../extension-methods.ts';

type Crucible = { location: string; direction: Direction; steps: number; heat: number };

export const processInput = (input: string, maxMove: number, condition: (crucible: Crucible) => boolean) => {
	const matrix = Matrix.fromInput(input, Number);
	const clockwise: Record<string, Direction> = { '↑': '→', '→': '↓', '↓': '←', '←': '↑' };
	const antiClockwise: Record<string, Direction> = { '↑': '←', '←': '↓', '↓': '→', '→': '↑' };
	let crucibles: Crucible[] = [
		{ location: 'x0y0', direction: '→', steps: 0, heat: 0 },
		{ location: 'x0y0', direction: '↓', steps: 0, heat: 0 },
	];
	const visited = new Set<string>();
	for (let i = 0;; i++) {
		const nextCrucibles: Crucible[] = [];
		if (
			crucibles.find((crucible: Crucible) => {
				if (--crucible.heat > 0) return !nextCrucibles.push(crucible);
				const [x, y] = Matrix.coordinate(crucible.location);
				if (x < 0 || y < 0 || x >= matrix.width || y >= matrix.length) return false;
				if (x === matrix.width - 1 && y === matrix.length - 1 && condition(crucible)) return true;
				const neighbours = Object.entries(matrix.neighbours(x, y, crucible.direction));
				if (!neighbours.length) return false;
				const [location, heat] = neighbours[0];
				const key = `${location}${crucible.direction}${++crucible.steps}`;
				if (visited.has(key)) return false;
				visited.add(key);
				if (crucible.steps < maxMove) nextCrucibles.push({ ...crucible, location, heat });
				if (!condition(crucible)) return false;
				nextCrucibles.push(
					{ location, direction: clockwise[crucible.direction], steps: 0, heat },
					{ location, direction: antiClockwise[crucible.direction], steps: 0, heat },
				);
			})
		) return i;
		crucibles = nextCrucibles;
	}
};

export const p1 = (input: string) => processInput(input, 3, () => true);

export const p2 = (input: string) => processInput(input, 10, ({ steps }) => steps >= 4);
