import '../extension-methods.ts';

type Game = {id: string, cubes: Cube[]};
type CubeType = 'red' | 'green' | 'blue';
type Cube = {type: CubeType, amount: number};

const processInput = (input: string): Game[] => input.splitRows().map((ln): Game => {
  const [ , id, log] = /^Game (\d+): (.*)$/.exec(ln) ?? [];
  const cubes = log.matchMap(/(\d+) (\w+)/g, ([, amount, colour]): Cube => {
    const type = colour as CubeType;
    return { type, amount: Number(amount)}
  });
  return {id, cubes};
});

export const p1 = (input: string): number => {
  const maxPerType: Record<CubeType, number> = {red: 12, green: 13, blue: 14};
  return processInput(input)
    .filter(({cubes}) => cubes.every(({type, amount}) => amount <= maxPerType[type]))
    .reduce((acc, {id}) => acc + Number(id), 0);
}

export const p2 = (input: string): number => {
  return processInput(input)
    .map(({cubes}) =>
      cubes.reduce((maxPerType: Record<CubeType, number>, {amount, type}) =>
        ({...maxPerType, [type]: Math.max(maxPerType[type], amount)}),
        {red: 0, green: 0, blue: 0}))
    .map(({red, green, blue}) => red * green * blue)
    .reduce((acc, power) => acc + power, 0);
}
