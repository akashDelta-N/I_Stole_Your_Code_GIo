import {Matrix} from "../extension-methods.ts";

type XY = { x: number, y: number };
type Node = { directions: XY[], value: string }
type Input = { matrix: Matrix<Node>, startNode: XY[], startDirection: XY };

const directions: Record<string, XY[]> = {
  'S': [{x: 1, y: 0}, {x: -1, y: 0}, {x: 0, y: -1}, {x: 0, y: 1}],
  '|': [{x: 0, y: 1}, {x: 0, y: -1}],
  '-': [{x: -1, y: 0}, {x: 1, y: 0}],
  'L': [{x: 0, y: -1}, {x: 1, y: 0}],
  'J': [{x: 0, y: -1}, {x: -1, y: 0}],
  '7': [{x: 0, y: 1}, {x: -1, y: 0}],
  'F': [{x: 0, y: 1}, {x: 1, y: 0}],
  '.': [],
};

const move = ({x, y}: XY, {x: dx, y: dy}: XY): XY => ({x: x + dx, y: y + dy});

const processInput = (input: string): Input => {
  const matrix = new Matrix(input.splitRows().map(y => [...y].map(x => ({ directions: directions[x], value: x }))));
  const startIndex = input.replace(/\s+/g, '').indexOf('S');
  const startX = startIndex % matrix.width;
  const startY = Math.floor(startIndex / matrix.width);
  const startNode = matrix.get(startX, startY)!.directions;
  const startDirection: XY = { x: startX, y: startY };
  return { matrix, startNode, startDirection };
}

export const p1 = (input: string): number => {
  const {matrix, startNode, startDirection } = processInput(input);
  const loops = new Array<number>();
  startNode.forEach((direction) => {
    const visited = new Set<string>([`x${startDirection.x}y${startDirection.y}`]);
    for(let queue = [], current: XY = move(startDirection, direction); current; current = queue.shift()!) {
      const key = `x${current.x}y${current.y}`;
      if (visited.has(key)) continue;
      visited.add(key);
      const directions = matrix.get(current.x, current.y)?.directions;
      if (!directions?.length) continue;
      queue.push(...directions.map(dir => move(current, dir)).filter(({x, y}) => !visited.has(`x${x}y${y}`)));
    }
    loops.push(visited.size);
  });
  return Math.floor((Math.max(...loops)) / 2);
}

export const p2 = (input: string): number => {
  const {matrix, startNode, startDirection } = processInput(input);
  const loops = new Array<Set<string>>();
  startNode.forEach((direction) => {
    const {x, y} = move(startDirection, direction);
    const target = matrix.get(x, y)?.directions;
    if (!target?.find((d) => {
      const next = move({x, y}, d);
      return next.x === startDirection.x && next.y === startDirection.y;
    })) return;
    const visited = new Set<string>([]);
    for(let queue = [], current: XY = move(startDirection, direction); current; current = queue.shift()!) {
      const key = `x${current.x}y${current.y}`;
      if (key === `x${startDirection.x}y${startDirection.y}`) loops.push(visited);
      if (visited.has(key)) continue;
      visited.add(key);
      const directions = matrix.get(current.x, current.y)?.directions;
      if (!directions?.length) continue;
      queue.push(...directions.map(dir => move(current, dir)).filter(({x, y}) => !visited.has(`x${x}y${y}`)));
    }
  });

  return matrix.reduce((acc, row, y) => {
    let inside = false;
    row.forEach((cell, x) => {
      if ("|JL".includes(cell.value) && loops[0].has(`x${x}y${y}`)) inside = !inside;
      if (inside && !loops[0].has(`x${x}y${y}`)) acc++;
    });
    return acc;
  }, 0);
}
