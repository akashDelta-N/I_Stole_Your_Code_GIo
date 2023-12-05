import '../extension-methods.ts';

type Category = {dest?: number, start: number,  end: number, delta: number, length?: number };

const processCategories = (categories: string[]): Category[][] => categories.map(category => category.splitRows()
  .slice(1)
  .map(line => line.split(' ').map(Number))
  .map(([dest, start, length]): Category =>
    ({dest, start, end: start + length, delta: dest - start, length})));

export const p1 = (input: string): number => {
  const [ seed, ...categories ] = input.splitRows(2)
  const seedNums = seed.split(' ').slice(1).map(Number);
  return processCategories(categories)
    .reduce((itemNumbers, maps) => itemNumbers.map(fromItemNumber => {
      const map = maps.find(({start, length}) => start <= fromItemNumber && start + length! > fromItemNumber);
      return map ? fromItemNumber - map.start + map.dest! : fromItemNumber;
    }), seedNums)
    .reduce((minNumber, locationNumber) => Math.min(minNumber, locationNumber), Infinity);
}

export const p2 = (input: string): number => {
  const [seed, ...categories] = input.splitRows(2);
  const seedNums = seed.matchMap(/(\d+) (\d+)/g, ([, a, b]) => {
    const start = Number(a);
    const end = start + Number(b);
    return {start, end};
  });
  return processCategories(categories).reduce((numbers, maps) => {
    return numbers.flatMap(({start, end}) => {
      const nextNumbers = [];

      for (let currentStart = start; currentStart < end;) {
        let map = maps.find(({start, end}) => start <= currentStart && end > currentStart);

        if (!map) {
          const nextStart = maps
            .map(({start}) => start)
            .filter(start => start > currentStart)
            .reduce((minStart, start) => Math.min(minStart, start), Infinity);

          map = {
            start: currentStart,
            end: Math.min(end, nextStart),
            delta: 0,
          };
        }

        const destStart = currentStart + map.delta;
        const destEnd = Math.min(map.end, end) + map.delta;
        nextNumbers.push({start: destStart, end: destEnd});

        currentStart += destEnd - destStart;
      }

      return nextNumbers;
    });
  }, seedNums)
    .reduce((minStart, {start}) => Math.min(minStart, start), Infinity);
}
