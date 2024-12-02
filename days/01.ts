import '../extension-methods.ts';

export const p1 = (input: string): number => {
  const lines = input.splitRows().map(line => {
    const [left,right] = line.split('  ').map(Number);
    return {left, right};
  });

  const leftNumbers = lines.map(line => line.left).sort((a, b) => a - b);
  const rightNumbers = lines.map(line => line.right).sort((a, b) => a - b);
  let differences:number[] = leftNumbers.map((left, index) => Math.abs(left - rightNumbers[index]));

  const total = differences.reduce((acc, curr) => acc + curr, 0);
  return total;
}

export const p2 = (input: string): number => {
  const lines = input.splitRows().map(line => {
    const [left, right] = line.split('  ').map(Number);
    return {left, right};
  });
  
  const leftNumbers = lines.map(line => line.left);
  const rightNumbers = lines.map(line => line.right);

  const simularityScore = leftNumbers.map((left, index) => {
    return left * rightNumbers.filter(right => right === left).length;
  });
  return simularityScore.reduce((acc, curr) => acc + curr, 0);
}