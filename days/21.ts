import '../extension-methods.ts';
import { Matrix } from '../extension-methods.ts';

type Plot = { symbol: string; visited?: number };

export const p1 = (input: string, steps = 64) => {
	const garden = Matrix.fromInput<Plot>(input, (symbol): Plot => ({ symbol }));
	const startIndex = input.replace(/\s+/g, '').indexOf('S');
	const startX = startIndex % garden.width;
	const startY = Math.floor(startIndex / garden.width);
	let stepper = [`x${startX}y${startY}`];
	for (let step = 1; step <= steps; step++) {
		stepper = stepper.flatMap((walker) =>
			Object.entries(garden.neighboursByString(walker, '+')).filter(([, plot]) =>
				plot?.symbol !== '#' && (plot.visited ??= step) === step
			).map(([location]) => location)
		);
	}
	return garden.flatten().count((e) => !!(e.visited && e.visited % 2 === steps % 2));
};

export const p2 = (input: string): number => {
	const lines = input.splitRows().map(Number);
	return lines.length;
};
