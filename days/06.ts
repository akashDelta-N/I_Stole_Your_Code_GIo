import '../extension-methods.ts';

export const p1 = (input: string): number => {
  const [times, distances] = input.splitRows().map((row) => row.matchMap(/\d+/g, Number));
  return times.map((time, i) => {
    const d = Math.sqrt(time ** 2 - 4 * (distances[i] + 1));
    const [min, max] = [(-time + d) / -2, (-time - d) / -2].sortNums();
    return Math.floor(max) - Math.ceil(min) + 1;
  }).prod();
}

export const p2 = (input: string): number => p1(input.replace(/ +/g, ''))
