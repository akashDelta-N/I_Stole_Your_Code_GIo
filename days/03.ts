import '../extension-methods.ts';

const checkNeighbours = (matrix: string[], x: number, y: number, regex: RegExp): [boolean, string] => {
  const neighbours: Record<string, string | undefined> = {
    'y-=1;x-=1': matrix[y - 1]?.at(x - 1),
    'y-=1': matrix[y - 1]?.at(x),
    'y-=1;x+=1': matrix[y - 1]?.at(x + 1),
    'x-=1': matrix[y]?.at(x - 1),
    'x+=1': matrix[y]?.at(x + 1),
    'y+=1;x-=1': matrix[y + 1]?.at(x - 1),
    'y+=1': matrix[y + 1]?.at(x),
    'y+=1;x+=1': matrix[y + 1]?.at(x + 1),
  }

  const key = Object.keys(neighbours).find(key => !!neighbours[key] && regex.test(neighbours[key] ?? ''));
  if (key) eval(key);
  return [!!key, `x${x}y${y}`];
}

export const p1 = (input: string): number => {
  const matrix = input.splitRows();
  const parts: Array<number> = [];
  matrix.forEach((row, y) => {
    row.matchMap(/\d+/g, (value) => {
      const number = value[0];
      const startIndex = value.index ?? 0;
      const endIndex = startIndex + number.length - 1;
      for (let x = startIndex; x <= endIndex; x++) {
        const [hasPart] = checkNeighbours(matrix, x, y, /^((?![.\d\s]).)*$/);
        if(!hasPart) continue;
        parts.push(Number(number));
        break;
      }
    })
  });
  return parts.sum();
}

export const p2 = (input: string): number => {
  const matrix = input.splitRows();
  const gears: Record<string, Array<number>> = {};
  matrix.forEach((row, y) => {
    row.matchMap(/\d+/g, (value) => {
      const number = value[0];
      const startIndex = value.index ?? 0;
      const endIndex = startIndex + number.length - 1;
      for (let x = startIndex; x <= endIndex; x++) {
        const [hasPart, coordinates] = checkNeighbours(matrix, x, y, /^\*$/);
        if(!hasPart) continue;
        (gears[coordinates] ??= []).push(Number(number));
        break;
      }
    })
  });
  return Object.values(gears).map(gear => gear.length > 1 ? gear.prod() : 0).sum()
}
