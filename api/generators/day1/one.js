const faker = require('faker');
const { getRandomInt } = require('../util');

const INTERVAL_LENGTH = 11; // in hours
const NUM_SECONDS_INTERVAL = INTERVAL_LENGTH * 60 * 60; // in seconds

const generateTime = () => {
  return getRandomInt(NUM_SECONDS_INTERVAL);
};

const generateLine = () => {
  const email = faker.internet.userName() + generateEmailDomain(vanderbiltFrequency);

  return [
    faker.name.firstName() + ' ' + faker.name.lastName(),
    faker.phone.phoneNumber(),
    email,
    generateTime(),
  ];
};

exports.generate = (length = 500) => {
  let users = new Array(length).map(_ => generateLine());

  // only care about generated time
  users.sort(([_, __, ___, a], [____, _____, _____, b]) => {
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

    el[3] = `${hours}:${minutes}:${seconds}`;

    return el;
  });

  users.unshift(['Name', 'Phone', 'Email', 'Checkin']);
  return users.map(el => el.join(',')).join('\n');
};
