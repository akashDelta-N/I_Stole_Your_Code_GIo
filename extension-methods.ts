declare global {
	export interface String {
		/**
		 * Splits the string into an array of strings based on the amount of newline-characters.
		 * @param length {number} The amount of newline characters between each row.
		 */
		splitRows(length?: number): string[];

		/**
		 * Returns an array of matches from the string.
		 * @param regex {RegExp} The regular expression to match.
		 * @param map {Function} A function that maps the matches to a new value.
		 */
		matchMap<T>(regex: RegExp, map: (match: RegExpMatchArray) => T): T[];
	}

	export interface Array<T> {
		/**
		 * Sums all the numbers in the array
		 */
		sum(): number;

		/**
		 * Returns the product of all the numbers in the array
		 */
		prod(): number;

		/**
		 * Returns the highest number in the array
		 */
		max(): number;

		/**
		 * Returns the lowest number in the array
		 */
		min(): number;

		/**
		 * Returns the average of all the numbers in the array
		 */
		avg(): number;

		/**
		 * Sorts the array numerically
		 */
		sortNums(): number[];

		/**
		 * Count the amount of elements which match the predicate
		 * @param predicate {Function} The predicate to match
		 */
		count(predicate?: (item: T) => boolean): number;
	}
}

class Matrix<T = string> extends Array<Array<T>> {
	constructor(matrix: T[][] | string[]) {
		super(...matrix as T[][])
	}

	get(x: number, y: number): T | undefined {
		return this[y]?.[x];
	}

	neighbours(x: number, y: number, dir: 'all' | 'cross' | 'diagonal' = 'all'): Record<string, T | string> {
		const neighbours: Record<string, T | string> = {};
		if (dir === 'all' || dir === 'cross') {
			neighbours[`x${x}y${y - 1}`] = this.get(x, y - 1)!;
			neighbours[`x${x - 1}y${y}`] = this.get(x - 1, y)!;
			neighbours[`x${x + 1}y${y}`] = this.get(x + 1, y)!;
			neighbours[`x${x}y${y + 1}`] = this.get(x, y + 1)!;
		}
		if (dir === 'all' || dir === 'diagonal') {
			neighbours[`x${x - 1}y${y - 1}`] = this.get(x - 1, y - 1)!;
			neighbours[`x${x + 1}y${y - 1}`] = this.get(x + 1, y - 1)!;
			neighbours[`x${x - 1}y${y + 1}`] = this.get(x - 1, y + 1)!;
			neighbours[`x${x + 1}y${y + 1}`] = this.get(x + 1, y + 1)!;
		}
		return neighbours;
	}
}

String.prototype.splitRows = function (length = 1) {
	return this.trim().split(new RegExp(`\\n{${length}}`));
}

String.prototype.matchMap = function <T>(regex: RegExp, map: (match: RegExpMatchArray) => T) {
	return [...this.matchAll(regex)].map(map);
}

Array.prototype.sum = function () {
	return this.reduce((a, b) => a + +b, 0);
}

Array.prototype.prod = function () {
	return this.reduce((a, b) => a * +b, 1);
}

Array.prototype.max = function () {
	return Math.max(...this);
}

Array.prototype.min = function () {
	return Math.min(...this);
}

Array.prototype.avg = function () {
	return this.sum() / this.length;
}

Array.prototype.sortNums = function () {
	return this.sort((a, b) => a - b);
}

Array.prototype.count = function <T>(predicate?: (item: T) => boolean) {
	if (!predicate) return this.length;
	return this.filter(predicate).length;
}

export { Matrix };
