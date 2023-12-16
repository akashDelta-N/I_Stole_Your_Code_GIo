import '../extension-methods.ts';

export const hash = (input: string): number =>
	[...input.trim()].reduce((acc, char) => (acc + char.charCodeAt(0)!) * 17 % 256, 0);

export const p1 = (input: string): number => input.split(',').map(hash).sum();

export const p2 = (input: string): number => {
	const boxes = Array.from({ length: 256 }, (): Record<string, number> => ({}));
	input.replaceAll(',', '\n').matchMap(
		/^(\w+)[-=](\d+)?$/gm,
		([, label, focalLength]) => {
			const box = boxes[hash(label)];
			if (!focalLength) return delete box[label];
			box[label] = Number(focalLength);
		},
	);
	return boxes.reduce((acc, box, x) => {
		const allLengths = Object.values(box);
		return acc + allLengths.reduce((sum, z, y) => sum + (x + 1) * (y + 1) * z, 0);
	}, 0);
};
