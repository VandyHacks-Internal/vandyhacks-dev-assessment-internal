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

const one = [oneZero, oneOne, oneTwo, oneThree];
const two = [twoZero, twoOne, twoTwo];

// day must be 1 or 2. level must be 0, 1 or, 2

enum Day {
  One = 1,
  Two,
}

// TODO: kinda hacky but just passing in user to all levels now to accomodate discord level
async function getProblemInputData(day: Day, level: Level, user: string) {
  if (day === 1) {
    return await one[level](user);
  } else if (day === 2) {
    return await two[level]();
  }

  throw new Error('Day is invalid!');
}

export async function retrieveGeneratedData(user: string, level: number) {
  const firebase = getFirebaseAppInstance();
  const userRef = firebase.database().ref('/users/' + user);
  const dbValues = (await userRef.once('value')).val();

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

  // TODO: This is an omega hack you should probably not use env variables lul
  if (process.env.IS_GENERATE_LOCKED === 'false' || level === 0) {
    return inputData[level];
  } else {
    return generateLock;
  }
}
