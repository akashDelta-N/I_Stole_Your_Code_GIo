import '../extension-methods.ts';
import * as Graph from 'npm:@graph-algorithm/minimum-cut';

export function p1(input: string) {
	const wires = input
		.splitRows()
		.flatMap((line) => {
			const [start, ...ends] = line.split(/\W+/);
			return ends.map((end) => [start, end]);
		});

	const wiresToCut: string[][] = [...Graph.mincut(wires)];
	const eligibleWires = wires.filter((wire) => wiresToCut.every((wireToCut) => new Set([...wire, ...wireToCut]).size > 2));
	const all = new Set(eligibleWires.flat());
	const group = new Set<string>();

	const dfs = (x: string) => {
		if (!x) return;
		group.add(x);
		eligibleWires.forEach(([a, b]) =>
			dfs(x === a && !group.has(b) ? b : x === b && !group.has(a) ? a : ''));
	};
	dfs(wires[0][0]);
	return group.size * (all.size - group.size);
}

export const p2 = (_: string): number => 0;
