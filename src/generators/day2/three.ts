import { getRandomInt } from '../util';

export function generate(user: string): string {
  const num_comics = 2416; // As of 1/25/2021
  const ids = new Array(300).fill(0).map(_ => getRandomInt(0, num_comics));
  return ids.join('\n');
}
