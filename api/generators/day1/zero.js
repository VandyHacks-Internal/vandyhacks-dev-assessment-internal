const faker = require('faker');
const { generateEmailDomain } = require('../util');

const generateEntry = vanderbiltFrequency => {
  const email = faker.internet.userName() + generateEmailDomain(vanderbiltFrequency);

  return {
    name: faker.name.firstName() + ' ' + faker.name.lastName(),
    phone: faker.phone.phoneNumber(),
    email,
  };
};

exports.generate = (length = 100) => {
  const vanderbiltFrequency = Math.random() * 0.8 + 0.2; // from .2 to 1
  const users = new Array(length).map(_ => generateEntry(vanderbiltFrequency));

  return JSON.stringify(users);
};
