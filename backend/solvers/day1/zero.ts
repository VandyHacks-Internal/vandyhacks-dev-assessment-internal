export function solve(input: string): { answer: number } {
  const data = JSON.parse(input);
  let answer = 0;

  for (let { email } of data) {
    if (email.includes('vanderbilt.edu')) answer++;
  }

  return {
    answer,
  };
}
