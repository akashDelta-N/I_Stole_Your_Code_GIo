import '../extension-methods.ts';

export const p1 = (input: string): number =>
  input.splitRows().reduce((acc, x) => {
    const nums = x.replace(/\D/g, '');
    return acc + Number(`${nums.at(0)}${nums.at(-1)}`);
  }, 0);

export const p2 = (input: string): number => {
  const textNums: Record<string, number> = {one: 1, two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8, nine: 9};
  const regex = `(\\d|${Object.keys(textNums).join("|")})`
  return input.splitRows().reduce((acc, x) => {
    const [, a] = RegExp(regex).exec(x) ?? [];
    const [, b] = RegExp(`.*${regex}`).exec(x) ?? [];
    return acc + Number(`${textNums[a] ?? a}${textNums[b] ?? b}`);
  }, 0);
}
