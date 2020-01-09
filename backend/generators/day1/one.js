const faker = require('faker');
const { getRandomInt, generateEmailDomain } = require('../util');

const INTERVAL_LENGTH = 11; // in hours
const NUM_SECONDS_INTERVAL = INTERVAL_LENGTH * 60 * 60; // in seconds

const generateTime = () => {
  return getRandomInt(0, NUM_SECONDS_INTERVAL);
};

const makeNumberDoubleDigit = num => {
  if (num < 10) return '0' + num;

  return num;
};

const generateLine = () => {
  const email = faker.internet.userName() + generateEmailDomain();

  return [
    faker.name.firstName() + ' ' + faker.name.lastName(),
    faker.phone.phoneNumber(),
    email,
    generateTime(),
  ];
};

exports.generate = (length = 500) => {
  let users = new Array(length).fill(0).map(_ => generateLine());

  // only care about generated time
  users.sort(([_, __, ___, a], [____, _____, ______, b]) => {
    return a - b;
  });

  // -1 just prevents risk that I'm off by one and overflowed to the next day
  const intervalStart = getRandomInt(0, 24 - INTERVAL_LENGTH - 1);
  users = users.map(el => {
    // convert times to properly intervaled times
    const oldTime = el[3];
    const newTime = intervalStart * 60 * 60 + oldTime;

    const hours = Math.floor(newTime / 3600);
    const minutes = Math.floor((newTime - hours * 3600) / 60);
    const seconds = newTime - 60 * (hours * 60 + minutes);

    el[3] = `${makeNumberDoubleDigit(hours)}:${makeNumberDoubleDigit(
      minutes,
    )}:${makeNumberDoubleDigit(seconds)}`;

    return el;
  });

  users.unshift(['Name', 'Phone', 'Email', 'Checkin']);
  return users.map(el => el.join(',')).join('\n');
};
