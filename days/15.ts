import '../extension-methods.ts';

export const hash = (input: string): number =>
	[...input.trim()].reduce((acc, char) => (acc + char.charCodeAt(0)!) * 17 % 256, 0);

export const p1 = (input: string): number => input.split(',').map(hash).sum();

export const p2 = (input: string): number => {
	const boxes = Array.from({ length: 256 }, (): Record<string, number> => ({}));
	input.replace(/\s+/, '').replaceAll(',', '\n').matchMap(
		/^(\w+)[-=](\d+)?$/gm,
		([, label, focalLength]) => {
			const box = boxes[hash(label)];
			if (!focalLength) return delete box[label];
			box[label] = Number(focalLength);
		},
	);
	return boxes.reduce((acc, box, y) => {
		const allLengths = Object.values(box).filter(Boolean);
		return acc + allLengths.map((focalLength, x) => (y + 1) * (x + 1) * focalLength).sum();
	}, 0);
};
