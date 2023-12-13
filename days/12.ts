import '../extension-methods.ts';

const status = { Damaged: '#', Operational: '.', Unknown: '?' };
type Springs = Array<'#' | '.' | '?'>;
type FindArrangementsFn = (springs: Springs, groups: number[], i: number) => number;

const processInput = (input: string) =>
	input.matchMap(/^([?#.]+)\s((?:\d,?)+)$/gm, ([, springsStr, groupsStr]) => ({
		springs: [...springsStr] as Springs,
		groups: groupsStr.split(',').map(Number),
	}));

// https://en.wikipedia.org/wiki/Memoization
const memoizeFunction = (fn: FindArrangementsFn): FindArrangementsFn => {
	const cache = new Map();
	return (...args: [Springs, number[], number]) => {
		const key = JSON.stringify(args);
		if (cache.has(key)) return cache.get(key);
		const result = fn(...args);
		cache.set(key, result);
		return result;
	};
};

const find = memoizeFunction((springs: Springs, groups: number[], i: number): number => {
	const [spring, ...remainingSprings] = springs;
	const [group, ...remainingGroups] = groups;
	const running = Boolean(~i);

	if (!spring) return Number(!groups.length && !running || groups.length === 1 && group === i);
	const operational = spring === status.Operational;
	const damaged = spring === status.Damaged;
	const unknown = spring === status.Unknown;

	let arrangements = 0;
	arrangements += (unknown || damaged) && !running ? find(remainingSprings, groups, 1) : 0;
	arrangements += (unknown || damaged) && running ? find(remainingSprings, groups, i + 1) : 0;
	arrangements += (unknown || operational) && !running ? find(remainingSprings, groups, -1) : 0;
	arrangements += (unknown || operational) && running && i === group ? find(remainingSprings, remainingGroups, -1) : 0;
	return arrangements;
});

export const p1 = (input: string): number =>
	processInput(input).map(({ springs, groups }) => find(springs, groups, -1)).sum();

export const p2 = (input: string): number =>
	processInput(input).map(({ springs: s, groups: g }) => {
		const springs: Springs = [...s, '?', ...s, '?', ...s, '?', ...s, '?', ...s];
		const groups: number[] = [...g, ...g, ...g, ...g, ...g];
		return find(springs, groups, -1);
	}).sum();
