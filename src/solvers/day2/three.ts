import fetch from 'node-fetch';
export async function solve(input: string) {
  const numbers: string[] = input.split('\n');
  const altTexts: string[] = [];
  for (const number of numbers) {
    if (number === '404') {
      continue;
    }
    const comic: Promise<{
      month: string;
      num: number;
      link: string;
      year: string;
      news: string;
      safe_title: string;
      transcript: string;
      alt: string;
      img: string;
      title: string;
      day: string;
    }> = (await fetch(`http://xkcd.com/${number}/info.0.json`)).json();
    altTexts.push((await comic).alt);
  }
  const answer = altTexts.join('\n');
  console.log(answer);
  return { answer };
}
