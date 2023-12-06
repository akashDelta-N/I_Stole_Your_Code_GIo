import '../extension-methods.ts';

const processInput = (input: string) => {
  const [times, records] = input.splitRows().map((row) => row.matchMap(/\d+/g, Number));
  return times.reduce((acc, time, i) => {
    let timesBeaten = 0;
    for (let hold = 0; hold < time; ++hold)
      timesBeaten += Number(hold * (time - hold) > records[i]);
    return acc * timesBeaten;
  }, 1);
}

export const p1 = (input: string): number => processInput(input)

export const p2 = (input: string): number => processInput(input.replace(/ /g, ''))
