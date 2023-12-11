import '../extension-methods.ts';

type Card = { winning: number[]; numbers: number[]; cardCount: number };

const processInput = (input: string, map: (card: Card, index: number, cards: Card[]) => number) =>
	input.matchMap(/^.+:\s+([\d\s]+)\s\|\s([\s\d]+)$/gm, ([, win, num]): Card => {
		const parseNums = (nums: string) => nums.split(/\s+/g).map(Number);
		return { winning: parseNums(win), numbers: parseNums(num), cardCount: 1 };
	}).map(map).reduce((acc, x) => acc + x, 0);

export const p1 = (input: string): number =>
	processInput(input, ({ winning, numbers }) => {
		const matches = numbers.count((num) => winning.includes(num));
		return matches ? 2 ** (matches - 1) : 0;
	});

export const p2 = (input: string): number =>
	processInput(input, ({ winning, numbers, cardCount }, index, cards) => {
		const matches = numbers.count((num) => winning.includes(num));
		for (let i = 1; i <= matches && index + i < cards.length; i++) {
			cards[index + i].cardCount += cardCount;
		}
		return cardCount;
	});
