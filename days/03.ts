import '../extension-methods.ts';

const checkNeighbours = (matrix: string[], x: number, y: number, regex: RegExp): [boolean, string] => {
  const neighbours: Record<string, string> = {
    [`x${x - 1}y${y - 1}`]: matrix[y - 1]?.[x - 1],
    [`x${x}y${y - 1}`]: matrix[y - 1]?.[x],
    [`x${x + 1}y${y - 1}`]: matrix[y - 1]?.[x + 1],
    [`x${x - 1}y${y}`]: matrix[y]?.[x - 1],
    [`x${x + 1}y${y}`]: matrix[y]?.[x + 1],
    [`x${x - 1}y${y + 1}`]: matrix[y + 1]?.[x - 1],
    [`x${x}y${y + 1}`]: matrix[y + 1]?.[x],
    [`x${x + 1}y${y + 1}`]: matrix[y + 1]?.[x + 1],
  }
  const coordinates = Object.keys(neighbours)
    .find(key => neighbours[key] && regex.test(neighbours[key]));
  return [!!coordinates, coordinates ?? `x${x}y${y}`];
}

export const p1 = (input: string): number => {
  const matrix = input.splitRows();
  const parts: Array<number> = [];
  matrix.forEach((row, y) => {
    row.matchMap(/\d+/g, ({0: number, index}) => {
      for (let i = index ?? 0, x = i; x < i + number.length; x++) {
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
    row.matchMap(/\d+/g, ({0: number, index}) => {
      for (let i = index ?? 0, x = i; x < i + number.length; x++) {
        const [hasPart, coordinates] = checkNeighbours(matrix, x, y, /^\*$/);
        if(!hasPart) continue;
        (gears[coordinates] ??= []).push(Number(number));
        break;
      }
    })
  });
  return Object.values(gears).map(gear => gear.length > 1 ? gear.prod() : 0).sum()
}
