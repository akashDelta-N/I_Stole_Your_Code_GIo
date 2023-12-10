import '../extension-methods.ts';

const processInput = (input: string, map: (sequence: number[]) => number): number =>
  input.splitRows().map((x) => map(x.split(' ').map(Number))).reduce((acc, x) => acc + x, 0);

const next = (sequence: number[]): number => {
  if (sequence.every(x => !x)) return 0;
  const delta = sequence.slice(0, -1).map((x, i) => sequence[i + 1] - x);
  return sequence.at(-1)! + next(delta);
}

const prev = (sequence: number[]): number => {
  if (sequence.every(x => !x)) return 0;
  const delta = sequence.slice(0, -1).map((x, i) => sequence[i + 1] - x);
  return sequence[0] - prev(delta);
}

export const p1 = (input: string): number => processInput(input, next);

export const p2 = (input: string): number => processInput(input, prev);
