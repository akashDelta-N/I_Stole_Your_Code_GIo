import '../extension-methods.ts';

const hash = (input: string): number =>
	[...input.trim()].reduce((acc, char: string): number => (acc + char.charCodeAt(0)!) * 17 % 256, 0);

export const p1 = (input: string): number => input.split(',').map(hash).sum();

export const p2 = (input: string): number => {
	const boxes = Array.from({ length: 256 }, (): Record<string, number | null> => ({}));
	input.replaceAll(',', '\n').matchMap(
		/^(\w+)([-=])(\d+)?$/gm,
		([, label, operation, length]) => boxes[hash(label)][label] = operation === '=' ? Number(length) : null,
	);
	return boxes.reduce((acc, box, y) => {
		const allLengths = Object.values(box).filter(Boolean) as number[];
		return acc + allLengths.map((length, x) => (y + 1) * (x + 1) * length).sum();
	}, 0);
};
