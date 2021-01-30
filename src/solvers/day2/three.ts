import fetch from 'node-fetch';
import lodash from 'lodash';

export async function solve(input: string) {
  const numbers: string[] = lodash.without(input.split('\n'), '404');
  let altTexts: string[] = [];
  try {
    altTexts = await Promise.all(
      numbers.map(async number => {
        const promise: Promise<{
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
        const comic = await promise;
        return comic.alt;
      }),
    );
  } catch (error) {
    console.log(error);
    throw error;
  }

  return { answer: altTexts };
}
