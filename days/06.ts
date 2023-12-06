import '../extension-methods.ts';

const calculateTimesBeaten = (time: number, distance: number): number => {
  const d = Math.sqrt(time ** 2 - 4 * (distance + 1));
  const [min, max] = [(-time + d) / -2, (-time - d) / -2].sortNums();
  return Math.floor(max) - Math.ceil(min) + 1;
}

export const p1 = (input: string): number => {
  const [times, distances] = input.splitRows().map((row) => row.matchMap(/\d+/g, Number));
  return times.map((time, i) => calculateTimesBeaten(time, distances[i])).prod();
}

export const p2 = (input: string): number => p1(input.replace(/ +/g, ''))
