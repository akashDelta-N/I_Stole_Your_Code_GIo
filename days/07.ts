import '../extension-methods.ts';

type Hand = {strength: string, type: string, bid: number};

const processInput = (input: string, containsJokers: boolean) =>
  input.matchMap(/^(.+)\s(\d+)$/gm, ([, hand, bid]): Hand => {
      const cardStrength = containsJokers ? "J23456789TQKA" : "23456789TJQKA";
      const handStrength = [...hand].map(card => cardStrength.indexOf(card).toString(13)).join("");
      const cardCounts = [...hand].reduce((acc, card) => ({ ...acc, [card]: (acc[card] ?? 0) + 1 }), {} as Record<string, number>);
      let cardTotals: Array<number>;
      if (containsJokers) {
        const jokerCount = cardCounts.J ?? 0;
        delete cardCounts.J;
        cardTotals = Object.values(cardCounts).sort((a, b) => b - a);
        cardTotals[0] = (cardTotals[0] ?? 0) + jokerCount;
      } else {
        cardTotals = Object.values(cardCounts).sort((a, b) => b - a);
      }
      return { strength: handStrength, type: cardTotals.join(""), bid: Number(bid)}
    })
    .sort((a, b) => a.type.localeCompare(b.type) || a.strength.localeCompare(b.strength))
    .reduce((acc, { bid }, index) => acc + (bid * (index + 1)), 0);

export const p1 = (input: string): number => processInput(input, false);

export const p2 = (input: string): number => processInput(input,  true);
