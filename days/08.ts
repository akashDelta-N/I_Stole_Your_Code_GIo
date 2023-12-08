import '../extension-methods.ts';

type Map = { L: string, R: string };

const processInput = (input: string) => {
  const [instructionsNodes, mapNodes] = input.splitRows(2);
  const instructions = instructionsNodes.split("") as Array<'L' | 'R'>;
  const maps: Record<string, Map> = Object.fromEntries(
    mapNodes.matchMap(/^(\w+) = \((\w+), (\w+)\)$/gm, ([, from, L, R]) => [from, { L, R }])
  );
  return { instructions, maps };
}

export const p1 = (input: string): number => {
  const { instructions, maps } = processInput(input);
  let steps = 0
  for (let currentNode = "AAA"; currentNode !== "ZZZ"; steps++)
    currentNode = maps[currentNode]?.[instructions[steps % instructions.length]];
  return steps
}

export const p2 = (input: string): number => {
  const { instructions, maps } = processInput(input);
  let steps = 0;
  const leastSteps = new Array<number>();
  for (let currentNodes = Object.keys(maps).filter(e => e.endsWith("A")); currentNodes.length; steps++) {
    currentNodes = currentNodes.filter(currentNode => {
      const nodeEnded = currentNode.endsWith("Z");
      if (nodeEnded) leastSteps.push(steps);
      return !nodeEnded;
    }).map(map => maps[map][instructions[steps % instructions.length]]);
  }
  return leastSteps.reduce((acc, x) => {
    const gcd = (a: number, b: number): number => b ? gcd(b, a % b) : a;
    return acc * x / gcd(acc, x);
  });
}
