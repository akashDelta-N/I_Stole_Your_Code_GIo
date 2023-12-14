import '../extension-methods.ts';

declare global {
	interface Array<T> {
		rotate(): Array<T>;
		moveRocks(): Array<T>;
		getTotalLoad(): number;
	}
}

Array.prototype.rotate = function () {
	return [...this[0]].map((_, index) => this.map((row) => row[index]).reverse().join(''));
};

Array.prototype.moveRocks = function () {
	return this.map((row) =>
		row.replaceAll(/[.O]+/g, (roundRocksSpaces: string) => {
			return roundRocksSpaces.replace(/\./g, '').padStart(roundRocksSpaces.length, '.');
		})
	);
};

Array.prototype.getTotalLoad = function () {
	return this.reduce((acc, row, i) => {
		const loadMultiplier = row.length - i;
		const rockCount = [...row].count((cell) => cell === 'O');
		return acc + (rockCount * loadMultiplier);
	}, 0);
};

export const p1 = (input: string): number =>
	input.splitRows().rotate().moveRocks().rotate().rotate().rotate().getTotalLoad();

export const p2 = (input: string): number => {
	const cache: Record<string, number> = {};
	let matrix = input.splitRows();
	for (let i = 0; i < 1e9; i++) {
		matrix = matrix.rotate().moveRocks().rotate().moveRocks().rotate().moveRocks().rotate().moveRocks();
		const state = matrix.join('\n');
		if ((cache[state] ??= i) === i) continue;
		const diff = i - cache[state];
		while (i < 1e9 - diff) i += diff;
	}
	return matrix.getTotalLoad();
};
