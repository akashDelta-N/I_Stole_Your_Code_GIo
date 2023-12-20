import '../extension-methods.ts';

type Input = { workflows: Record<string, Rule[]>; parts: Part[] };
type Rule = { category: 'x' | 'm' | 'a' | 's'; operator?: '<' | '>'; value: number; workflow: string };
type Part = { x: number; m: number; a: number; s: number };
type Range = { from: number; to: number };
type PartRange = { x: Range; m: Range; a: Range; s: Range; workflow: string };

const processInput = (input: string): Input => {
	const [workflowsString, partsString] = input.splitRows(2);
	const workflows = Object.fromEntries(
		workflowsString.matchMap(/^(\w+){([^}]+)}$/gm, ([, name, rulesString]): [string, Rule[]] => {
			const rules = rulesString.replaceAll(',', '\n').matchMap(
				/^(?:(\w+)([<>])(\d+):)?(\w+)$/gm,
				([, categoryString, operatorString, valueString, workflow]): Rule => {
					const category = categoryString as 'x' | 'm' | 'a' | 's';
					const operator = operatorString as '<' | '>' | undefined;
					const value = Number(valueString);
					return { category, operator, value, workflow };
				},
			);
			return [name, rules];
		}),
	);
	const parts = partsString.matchMap(
		/^\{x=(\d+),m=(\d+),a=(\d+),s=(\d+)}$/gm,
		([, x, m, a, s]) => ({ x: Number(x), m: Number(m), a: Number(a), s: Number(s) }),
	);
	return { workflows, parts };
};

export const p1 = (input: string): number => {
	const { workflows, parts } = processInput(input);
	const acceptedPart = (part: Part, workflowName: string): boolean => {
		if (workflowName === 'A') return true;
		if (workflowName === 'R') return false;
		for (let { category, operator, value, workflow } of workflows[workflowName]) {
			const smallerThan = operator === '<' && part[category] < value;
			const largerThan = operator === '>' && part[category] > value;
			if (!operator || smallerThan || largerThan) return acceptedPart(part, workflow);
		}
		return false;
	};
	return parts
		.filter((part) => acceptedPart(part, 'in'))
		.reduce((acc, { x, m, a, s }) => acc + x + m + a + s, 0);
};

export const p2 = (input: string): number => {
	const { workflows } = processInput(input);
	let ranges: PartRange[] = [
		{
			x: { from: 1, to: 4000 },
			m: { from: 1, to: 4000 },
			a: { from: 1, to: 4000 },
			s: { from: 1, to: 4000 },
			workflow: 'in',
		},
	];
	while (ranges.some((range) => range.workflow !== 'A')) {
		ranges = ranges.flatMap((range) => {
			if (range.workflow === 'A') return [range];
			if (range.workflow === 'R') return [];

			return workflows[range.workflow].map(({ category, operator, value, workflow }) => {
				const matchedRange = { ...structuredClone(range), workflow };
				if (operator === '<') {
					matchedRange[category].to = Math.min(matchedRange[category].to, value - 1);
					range[category].from = Math.max(range[category].from, value);
				}
				if (operator === '>') {
					matchedRange[category].from = Math.max(matchedRange[category].from, value + 1);
					range[category].to = Math.min(range[category].to, value);
				}
				return matchedRange;
			});
		});
	}

	return ranges.reduce(
		(acc, { x, m, a, s }) =>
			acc + (x.to - x.from + 1) * (m.to - m.from + 1) * (a.to - a.from + 1) * (s.to - s.from + 1),
		0,
	);
};
