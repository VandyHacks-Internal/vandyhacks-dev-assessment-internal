import { Level } from '../enums';

import { generate as oneZero } from './day1/zero';
import { generate as oneOne } from './day1/one';
import { generate as oneTwo } from './day1/two';

import { generate as twoZero } from './day1/zero';
import { generate as twoOne } from './day1/one';
import { generate as twoTwo } from './day1/two';

const one = [oneZero, oneOne, oneTwo];
const two = [twoZero, twoOne, twoTwo];

// day must be 1 or 2. level must be 0, 1 or, 2

enum Day {
  One = 1,
  Two,
}

export function getProblemInputData(day: Day, level: Level) {
  if (day === 1) {
    return one[level]();
  } else if (day === 2) {
    return two[level]();
  }

  throw new Error('Day is invalid!');
}

export function getAllProblemsInputData(day: Day) {
  if (day === 1) {
    return new Object(one.map(el => el()));
  } else if (day === 2) {
    return new Object(two.map(el => el()));
  }

  throw new Error('Day is invalid!');
}
