import '../extension-methods.ts';

type ConditionRecords = Array<'.' | '#' | '?'>;
type FindArrangementsFn = (springs: ConditionRecords, groups: number[], i: number) => number;

const processInput = (input: string) =>
	input.matchMap(/^([?#.]+)\s((?:\d,?)+)$/gm, ([, springsStr, groupsStr]) => ({
		springs: [...springsStr] as ConditionRecords,
		groups: groupsStr.split(',').map(Number),
	}));

const find: FindArrangementsFn = memoizeFunction(findArrangements);

// https://en.wikipedia.org/wiki/Memoization
function memoizeFunction(fn: FindArrangementsFn): FindArrangementsFn {
	const cache = new Map();
	return (...args: [ConditionRecords, number[], number]) => {
		const key = JSON.stringify(args);
		if (cache.has(key)) return cache.get(key);
		const result = fn(...args);
		cache.set(key, result);
		return result;
	};
}

function findArrangements(springs: ConditionRecords, groups: number[], i: number): number {
	const [spring, ...remainingSprings] = springs;
	const [group, ...remainingGroups] = groups;
	const running = Boolean(~i);

	if (!spring) return Number(!groups.length && !running || groups.length === 1 && group === i);
	const groupsSum = groups.sum();
	const groupSizeReached = i === group;
	const unsafeSprings = springs.count((x) => '#?'.includes(x));
	const operational = spring === '.';
	const damaged = spring === '#';
	const unknown = spring === '?';

	if (
		(running && unsafeSprings + i < groupsSum) ||
		(!running && unsafeSprings < groupsSum) ||
		(running && groups.length === 0) ||
		(operational && running && !groupSizeReached)
	) {
		return 0;
	}

	let arrangements = 0;
	arrangements += operational && running && groupSizeReached ? find(remainingSprings, remainingGroups, -1) : 0;
	arrangements += unknown && running && groupSizeReached ? find(remainingSprings, remainingGroups, -1) : 0;
	arrangements += (unknown || damaged) && running ? find(remainingSprings, groups, i + 1) : 0;
	arrangements += (unknown || damaged) && !running ? find(remainingSprings, groups, 1) : 0;
	arrangements += (unknown || operational) && !running ? find(remainingSprings, groups, -1) : 0;
	return arrangements;
}

export const p1 = (input: string): number =>
	processInput(input).map(({ springs, groups }) => find(springs, groups, -1)).sum();

export const p2 = (input: string): number =>
	processInput(input).map(({ springs: s, groups: g }) => {
		let springs: ConditionRecords = [...s, '?', ...s, '?', ...s, '?', ...s, '?', ...s];
		let groups = [...g, ...g, ...g, ...g, ...g];
		return find(springs, groups, -1);
	}).sum();
