const faker = require('faker');
const { generateEmailDomain, getRandomInt } = require('../util');

const generateEntry = vanderbiltFrequency => {
  const email = faker.internet.userName() + generateEmailDomain(vanderbiltFrequency);

  return {
    name: faker.name.firstName() + ' ' + faker.name.lastName(),
    phone: faker.phone.phoneNumber(),
    email,
  };
};

exports.generate = () => {
  const vanderbiltFrequency = Math.random() * 0.8 + 0.2; // from .2 to 1
  const users = new Array(getRandomInt(82, 123))
    .fill(0)
    .map(_ => generateEntry(vanderbiltFrequency));

  return JSON.stringify(users);
};
