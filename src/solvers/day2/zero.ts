export function solve(input: string): { answer: number } {
  const data = JSON.parse(input);
  let answer = 0;

  for (let { isVegan, glutenFree, allergies } of data) {
    if (isVegan || glutenFree || allergies !== '') answer++;
  }

  return {
    answer,
  };
}
