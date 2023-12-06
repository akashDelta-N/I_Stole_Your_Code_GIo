import '../extension-methods.ts';

export const p1 = (input: string): number => {
  const [times, records] = input.splitRows().map((row) => row.matchMap(/\d+/g, Number));
  return times.reduce((acc, time, i) => {
    let timesBeaten = 0;
    for (let hold = 0, record = records[i]; hold < time; ++hold)
      timesBeaten += Number(hold * (time - hold) > record);
    return acc * timesBeaten;
  }, 1);
}

export const p2 = (input: string): number => p1(input.replace(/ /g, ''))
