export function solve(input: string): { answer: number } {
  const parsedData = input
    .split('\n')
    .map(el => {
      const [_, __, ___, ____, _____, diet] = el.split(',');
      return diet;
    })
    .slice(1);

  let answer = 0;

  for (let diet of parsedData) {
    if (diet !== 'None') {
      answer++;
    }
  }

  return { answer };
}
