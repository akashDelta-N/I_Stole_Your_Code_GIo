import '../extension-methods.ts';

export const p1 = (input: string): number => {
  const lines = input.splitRows().map(x => x.split(' ').map(Number));

  const safeLines = lines.filter(line => {
    const isLineIncreasing = line.every((x, i, arr) => i === 0 || x > arr[i - 1]);
    const isLineDecreasing = line.every((x, i, arr) => i === 0 || x < arr[i - 1]);
    const isDiffSafe = line.every((x, i, arr) => i === 0 || Math.abs(x - arr[i - 1]) <= 3);
    return (isLineIncreasing || isLineDecreasing) && isDiffSafe;
  });

  return safeLines.count();
}

export const p2 = (input: string): number => {
  const lines = input.splitRows().map(x => x.split(' ').map(Number));
  const safeLines = lines.filter(line => {

    for (let i = 0; i < line.length; i++) {
      
      const newLine = line.filter((x, j) => j !== i);

      const isLineIncreasing = newLine.every((x, i, arr) => i === 0 || x > arr[i - 1]);
      const isLineDecreasing = newLine.every((x, i, arr) => i === 0 || x < arr[i - 1]);
      const isDiffSafe = newLine.every((x, i, arr) => i === 0 || Math.abs(x - arr[i - 1]) <= 3);
      if ((isLineIncreasing || isLineDecreasing) && isDiffSafe) {
        return true;
      }
    }

  });
  return safeLines.count();
}