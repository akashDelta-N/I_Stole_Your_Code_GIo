import '../extension-methods.ts';

type Hand = { strength: string; type: string; bid: number };

const processInput = (
	input: string,
	cardStrength: string,
	calculateTotals: (counts: Record<string, number>) => Array<number>,
) =>
	input.matchMap(/^(.+)\s(\d+)$/gm, ([, hand, bid]): Hand => {
		const handStrength = [...hand].map((card) => cardStrength.indexOf(card).toString(13)).join('');
		const cardCounts = [...hand].reduce(
			(acc, card) => ({ ...acc, [card]: (acc[card] ?? 0) + 1 }),
			{} as Record<string, number>,
		);
		return { strength: handStrength, type: calculateTotals(cardCounts).join(''), bid: Number(bid) };
	})
		.sort((a, b) => a.type.localeCompare(b.type) || a.strength.localeCompare(b.strength))
		.reduce((acc, { bid }, index) => acc + (bid * (index + 1)), 0);

export const p1 = (input: string): number =>
	processInput(input, '23456789TJQKA', (counts) => Object.values(counts).sort((a, b) => b - a));

export const p2 = (input: string): number =>
	processInput(input, 'J23456789TQKA', (counts) => {
		const jokerCount = counts.J ?? 0;
		delete counts.J;
		const cardTotals = Object.values(counts).sort((a, b) => b - a);
		cardTotals[0] = (cardTotals[0] ?? 0) + jokerCount;
		return cardTotals;
	});
