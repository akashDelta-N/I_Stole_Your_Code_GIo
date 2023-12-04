import '../extension-methods.ts';

export const p1 = (input: string): number =>
  input.splitRows().reduce((acc, x) => {
    const nums = x.replace(/\D/g, '');
    return acc + Number(`${nums.at(0)}${nums.at(-1)}`);
  }, 0);

export const p2 = (input: string): number => {
  const textNums: Record<string, number> = {one: 1, two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8, nine: 9};
  const keys = Object.keys(textNums).join("|")
  return input.matchMap(
    RegExp(`(\\d|${keys}).*(\\d|${keys})`, 'g'),
    ([, a, b]) => Number(`${textNums[a] ?? a}${textNums[b] ?? b}`)
  ).reduce((acc, x) => acc + x, 0);
}
