import { Level, Solution } from '../types';
import firebase from 'firebase';

import { solve as oneZero } from './day1/zero';
import { solve as oneOne } from './day1/one';
import { solve as oneTwo } from './day1/two';

import { solve as twoZero } from './day2/zero';
import { solve as twoOne } from './day2/one';
import { solve as twoTwo } from './day2/two';

const one = [oneZero, oneOne, oneTwo];
const two = [twoZero, twoOne, twoTwo];

firebase.initializeApp({
  databaseURL: process.env.DATABASE_URL,
});

export async function getProblemSolution(user: string, level: Level): Promise<Solution> {
  const { day, input } = (
    await firebase
      .database()
      .ref(`/users/${user}/`)
      .once('value')
  ).val();

  if (input == null) throw new Error("User doesn't have input");

  if (day === 1) {
    return one[level](input[level]);
  } else if (day === 2) {
    return two[level](input[level]);
  }

  throw new Error("Day either doesn't exist or isn't 1/2");
}
