import { Level, Solution } from '../types';
import { solveLock } from '../placeholders';
import { getFirebaseAppInstance } from '../database';

import { solve as oneZero } from './day1/zero';
import { solve as oneOne } from './day1/one';
import { solve as oneTwo } from './day1/two';
import { solve as oneThree } from './day1/three';

import { solve as twoZero } from './day2/zero';
import { solve as twoOne } from './day2/one';
import { solve as twoTwo } from './day2/two';

const one = [oneZero, oneOne, oneTwo, oneThree];
const two = [twoZero, twoOne, twoTwo];

export async function getProblemSolution(user: string, level: Level): Promise<Solution> {
  if (level !== 0 && level !== 1 && level !== 2 && level !== 3) throw new Error('Not valid level.');

  const app = getFirebaseAppInstance();

  const { day, inputs } = (
    await app
      .database()
      .ref(`/users/${user}/`)
      .once('value')
  ).val();

  if (inputs == null) throw new Error("User doesn't have input");

  if (day === 1) {
    return one[level](inputs[level]);
  } else if (day === 2) {
    return two[level](inputs[level]);
  }

  throw new Error("Day either doesn't exist or isn't 1/2");
}
