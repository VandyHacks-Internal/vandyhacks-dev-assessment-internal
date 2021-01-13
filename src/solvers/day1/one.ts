// export function solve(input: string): { answer: number } {
//   const parsedData = input
//     .split('\n')
//     .map(el => {
//       const [_, __, ___, countryCode, ____, _____] = el.split(',');
//       return countryCode;
//     })
//     .slice(1);

//   let answer = 0;

//   for (let countryCode of parsedData) {
//     if (countryCode !== 'US') {
//       answer++;
//     }
//   }

//   return { answer };
// }

export function solve(input: string) {
  return { answer: 'Nice try. Check back here after your submission deadline!' };
}
