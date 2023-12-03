import '../extension-methods.ts';

const checkNeighbours = (matrix: string[], x: number, y: number, regex: RegExp): [boolean, string] => {
  const neighbours: Record<string, string | undefined> = {
    [`x${x - 1}y${y - 1}`]: matrix[y - 1]?.at(x - 1),
    [`x${x}y${y - 1}`]: matrix[y - 1]?.at(x),
    [`x${x + 1}y${y - 1}`]: matrix[y - 1]?.at(x + 1),
    [`x${x - 1}y${y}`]: matrix[y]?.at(x - 1),
    [`x${x + 1}y${y}`]: matrix[y]?.at(x + 1),
    [`x${x - 1}y${y + 1}`]: matrix[y + 1]?.at(x - 1),
    [`x${x}y${y + 1}`]: matrix[y + 1]?.at(x),
    [`x${x + 1}y${y + 1}`]: matrix[y + 1]?.at(x + 1),
  }

  const loc = Object.keys(neighbours).find(key => neighbours[key] && regex.test(neighbours[key] ?? ''));
  return [!!loc, loc ?? ''];
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
