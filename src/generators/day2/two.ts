import pokemon from './pokemon.json';

import { shuffle, sampleSize } from 'lodash';
import { getRandomInt } from '../util';

export function generate() {
  const num = getRandomInt(140, 385);

  return JSON.stringify(shuffle(sampleSize(pokemon, num).map(el => el.name)));
}
