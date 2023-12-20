import { Matrix } from '../extension-methods.ts';

type Dig = { direction: string; amount: number };
type DigArea = { corners: Set<string>; size: number; x: number; y: number };

const calculateCapacity = (digs: Dig[]): number => {
	const directions: Record<string, [number, number]> = { 'R': [1, 0], 'L': [-1, 0], 'U': [0, 1], 'D': [0, -1] };
	const { size, corners } = digs.reduce((acc, { direction, amount }): DigArea => {
		const [x, y] = directions[direction]!;
		acc.x += x * amount;
		acc.y += y * amount;
		acc.size += amount;
		acc.corners.add(`x${acc.x}y${acc.y}`);
		return acc;
	}, { corners: new Set<string>(), size: 0, x: 0, y: 0 });
	const area = Array.from(corners).map((x) => Matrix.coordinate(x)).reduce((acc, next, i, corners) => {
		const [x1, y1] = next;
		const [x2, y2] = corners[(i + 1) % corners.length];
		return acc + x1 * y2 - x2 * y1;
	}, 0);
	return (Math.abs(area) / 2) + size / 2 + 1;
};

export const p1 = (input: string): number =>
	calculateCapacity(input.matchMap(
		/^([A-Z])\s(\d+)\s\(#.+\d\)$/gm,
		([, direction, amount]): Dig => ({ direction, amount: Number(amount) }),
	));

export const p2 = (input: string): number => {
	const findDirection = [...'RDLU'].reduce((acc, x, i) => ({ ...acc, [i]: x }), {} as Record<number, string>);
	return calculateCapacity(input.matchMap(/^[A-Z]\s\d+\s\(#(.+)(\d)\)$/gm, ([, hex, index]): Dig => {
		const direction = findDirection[Number(index)];
		const amount = parseInt(hex, 16);
		return { direction, amount };
	}));
};
