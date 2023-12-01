import '../extension-methods.ts';

export const p1 = (input: string): number =>
  input.splitRows().reduce((acc, x) => {
    const nums = x.replace(/\D/g, '');
    const calibration = +`${nums.at(0)}${nums.at(-1)}`;
    return acc + calibration;
  }, 0);


export const p2 = (input: string): number => {
  const textNums: Record<string, number> = {one: 1, two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8, nine: 9};
  const textNumsKeys = `(\\d|${Object.keys(textNums).join("|")})`
  return input.splitRows().reduce((acc, x) => {
    const [, a] = x.match(textNumsKeys) ?? [];
    const [, b] = x.match(`.*${textNumsKeys}`) ?? [];
    const calibration = +`${a in textNums ? textNums[a] : a}${b in textNums ? textNums[b] : b}`
    return acc + calibration;
  }, 0);
}
