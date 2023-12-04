import '../extension-methods.ts';

const processInput = (input: string) => input.matchMap(/^Card +\d+:\s+((?:\d+\s+)+)\|((?:\s+\d+)+)$/gm, ([, win, num]) => {
  const parseNums = (nums: string) => nums.trim().split(/\s+/g).map(Number);
  return { winning: parseNums(win), numbers: parseNums(num), cardCount: 1 };
});

export const p1 = (input: string): number => processInput(input)
  .map(({winning, numbers}) => {
    const matches = numbers.count(num => winning.includes(num));
    return matches ? 2 ** (matches - 1) : 0;
  })
  .reduce((acc, x) => acc + x, 0);

export const p2 = (input: string): number => processInput(input)
  .map(({winning, numbers, cardCount}, index, cards) => {
    const matches = numbers.count(num => winning.includes(num));
    for (let i = 1; i <= matches && index + i < cards.length; i++)
      cards[index + i].cardCount += cardCount;
    return cardCount;
  })
  .reduce((acc, x) => acc + x, 0);
