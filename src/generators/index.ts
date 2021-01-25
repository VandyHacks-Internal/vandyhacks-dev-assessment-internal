import { Level } from '../types';
import { generateLock } from '../placeholders';
import { getFirebaseAppInstance } from '../database';

import { generate as oneZero } from './day1/zero';
import { generate as oneOne } from './day1/one';
import { generate as oneTwo } from './day1/two';
import { generate as oneThree } from './day1/three';

import { generate as twoZero } from './day2/zero';
import { generate as twoOne } from './day2/one';
import { generate as twoTwo } from './day2/two';
import { generate as twoThree } from './day2/three';

const one = [oneZero, oneOne, oneTwo, oneThree];
const two = [twoZero, twoOne, twoTwo, twoThree];

// day must be 1 or 2. level must be 0, 1 or, 2

enum Day {
  One = 1,
  Two = 2,
}

const day1Release = new Date('January 16, 2021 18:00:00 UTC');
const day2aRelease = new Date('January 26, 2021 18:00:00 UTC');
const day2bRelease = new Date('January 27, 2021 18:00:00 UTC');

// TODO: kinda hacky but just passing in user to all levels now to accomodate discord level
async function getProblemInputData(day: Day, level: Level, user: string) {
  if (day === 1) {
    return await one[level](user);
  } else if (day === 2 || day === 2.5) {
    return await two[level](user);
  }

  throw new Error('Day is invalid!');
}

function checkReady(day: number) {
  const now = new Date();
  // Day 0 for VH internal testing
  return (
    (day === 1 && now >= day1Release) ||
    (day === 2 && now >= day2aRelease) ||
    (day === 2.5 && now >= day2bRelease) ||
    day === 0
  );
}

export async function retrieveGeneratedData(user: string, level: number) {
  const firebase = getFirebaseAppInstance();
  const userRef = firebase.database().ref('/users/' + user);
  const dbValues = (await userRef.once('value')).val();
  // Check if ready to release generated values
  if (level > 0 && !checkReady(dbValues.day)) {
    return generateLock;
  }
  let inputData;
  if (dbValues.inputs == null) {
    // generate and set inputs
    inputData = await Promise.all(
      [0, 1, 2, 3].map(level => getProblemInputData(dbValues.day, level, user)),
    );
    const update = { ['/users/' + user + '/inputs']: inputData };
    await firebase
      .database()
      .ref()
      .update(update);
  } else {
    inputData = dbValues.inputs;
  }

  return inputData[level];
}
