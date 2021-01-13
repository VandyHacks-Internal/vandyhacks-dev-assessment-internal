import faker from 'faker';
import { getRandomInt, generateEmailDomain } from '../util';

const INTERVAL_LENGTH = 11; // in hours
const NUM_SECONDS_INTERVAL = INTERVAL_LENGTH * 60 * 60; // in seconds

const generateTime = () => {
  return getRandomInt(0, NUM_SECONDS_INTERVAL);
};

const makeNumberDoubleDigit = (num: number) => {
  if (num < 10) return '0' + num;

  return num;
};

const generateLine = (): [string, string, string, number] => {
  const email = faker.internet.userName() + generateEmailDomain();

  return [
    faker.name.firstName() + ' ' + faker.name.lastName(),
    faker.phone.phoneNumber(),
    email,
    generateTime(),
  ];
};

export function generate() {
  const users = new Array(getRandomInt(480, 540)).fill(0).map(_ => generateLine());

  // only care about generated time
  users.sort(([_, __, ___, a], [____, _____, ______, b]) => {
    return a - b;
  });

  // -1 just prevents risk that I'm off by one and overflowed to the next day
  const intervalStart = getRandomInt(0, 24 - INTERVAL_LENGTH - 1);
  const usersWithTimeString = users.map(([name, phone, email, oldTime]) => {
    // convert times to properly intervaled times
    const newTime = intervalStart * 60 * 60 + oldTime;

    const hours = Math.floor(newTime / 3600);
    const minutes = Math.floor((newTime - hours * 3600) / 60);
    const seconds = newTime - 60 * (hours * 60 + minutes);

    const newTimeString = `${makeNumberDoubleDigit(hours)}:${makeNumberDoubleDigit(
      minutes,
    )}:${makeNumberDoubleDigit(seconds)}`;

    return [name, phone, email, newTimeString];
  });

  usersWithTimeString.unshift(['Name', 'Phone', 'Email', 'Checkin']);
  return usersWithTimeString.map(el => el.join(',')).join('\n');
}
