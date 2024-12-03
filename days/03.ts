import '../extension-methods.ts';

export const p1 = (input: string): number => {
  const matches = input.match(/mul\(\d+,\d+\)/gm);
  
  const result = matches?.map(match => {
    const numbers = match.match(/\d+/g);
    if (numbers) {
      return Number(numbers[0]) * Number(numbers[1]);
    }
  });
  return result?.reduce((acc: number, curr) => acc + (curr ?? 0), 0) ?? 0;
}

export const p2 = (input: string): number => {
  const matches = input.match(/(mul\(\d+,\d+\)|do\(\)|don't\(\))/gm);
  let exec = true;
  const result = matches?.map(match => {
    if (match === 'do()') {
      exec = true;
    }
    if (match === 'don\'t()') {
      exec = false;
    }
    if (exec) {
      const numbers = match.match(/\d+/g);
      if (numbers) {
        return Number(numbers[0]) * Number(numbers[1]);
      }
    }
  });
  return result?.reduce((acc: number, curr) => acc + (curr ?? 0), 0) ?? 0;
}