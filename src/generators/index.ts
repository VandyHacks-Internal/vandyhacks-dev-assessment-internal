import { Level } from '../types';
import { generateLock } from '../placeholders';
import { getFirebaseAppInstance } from '../database';

import { generate as oneZero } from './day1/zero';
import { generate as oneOne } from './day1/one';
import { generate as oneTwo } from './day1/two';

import { generate as twoZero } from './day2/zero';
import { generate as twoOne } from './day2/one';
import { generate as twoTwo } from './day2/two';

const one = [oneZero, oneOne, oneTwo];
const two = [twoZero, twoOne, twoTwo];

// day must be 1 or 2. level must be 0, 1 or, 2

enum Day {
  One = 1,
  Two,
}

function getProblemInputData(day: Day, level: Level) {
  if (day === 1) {
    return one[level]();
  } else if (day === 2) {
    return two[level]();
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
    inputData = [0, 1, 2].map(level => getProblemInputData(dbValues.day, level));
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
