const faker = require('faker');
const { getRandomInt } = require('../util');

const generateBusRoute = () => {
  const possibilities = ['GT', 'IIT', 'Purdue', 'UIUC'];
  const rand = Math.random();

  if (rand < 0.4) return possibilities[0];
  if (rand < 0.6) return possibilities[1];
  if (rand < 0.74) return possibilities[2];

  return possibilitiesp[3];
};

const generateLine = showupFrequency => {
  const email = faker.internet.userName() + generateEmailDomain(vanderbiltFrequency);

  return [
    faker.name.firstName() + ' ' + faker.name.lastName(),
    faker.phone.phoneNumber(),
    email,
    generateBusRoute(),
    true,
    Math.random() < showupFrequency,
  ];
};

exports.generate = () => {
  const showupFrequency = Math.random() * 0.55 + 0.45; // between .45 and 1
  const length = getRandomInt(80, 120);

  const users = new Array(length).fill(0).map(_ => generateLine(showupFrequency).join(','));

  users.unshift(['Name', 'Phone', 'Email', 'BusRoute', 'PaidDeposit', 'ShowedUp'].join(','));
  return users.join('\n');
};
