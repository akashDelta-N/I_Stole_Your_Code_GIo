import '../extension-methods.ts';

export const p1 = (input: string): number => {
  const lines = input.splitRows().map(String);
  let differences:number[] = [];
  let leftNumbers:number[] = [];
  let rightNumbers:number[] = [];

  lines.forEach((line, index) => {
    const splitLine = line.split('  ').map(Number);
    const left = splitLine[0];
    const right = splitLine[1];
    leftNumbers.push(left);
    rightNumbers.push(right);
  });

  leftNumbers = leftNumbers.sort((a, b) => a - b);
  rightNumbers = rightNumbers.sort((a, b) => a - b);

  for (let i = 0; i < leftNumbers.length; i++) {
    const left = leftNumbers[i];
    const right = rightNumbers[i];
    differences.push(Math.abs(left - right));
  }

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