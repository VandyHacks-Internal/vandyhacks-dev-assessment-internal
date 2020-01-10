const faker = require('faker');
const { generateEmailDomain, getRandomInt } = require('../util');

const VEGAN_CHANCE = 0.38;
const GLUTEN_FREE = 0.12;

const NUT_ALLERGY = 0.05;
const SOY_ALLERGY = 0.06;
const GUAVAS = 0.012;

const generateEntry = () => {
  const email = faker.internet.userName() + generateEmailDomain();
  const allergyList = [];

  const rand = Math.random();
  if (rand < NUT_ALLERGY) allergyList.push('Nuts');
  if (rand < SOY_ALLERGY) allergyList.push('Soybeans');
  if (rand < GUAVAS) allergyList.push('Guavas');

  return {
    name: faker.name.firstName() + ' ' + faker.name.lastName(),
    phone: faker.phone.phoneNumber(),
    email,
    isVegan: rand < VEGAN_CHANCE,
    glutenFree: rand < GLUTEN_FREE,
    allergies: allergyList.join(','),
  };
};

exports.generate = () => {
  const users = new Array(getRandomInt(80, 120)).fill(0).map(_ => generateEntry());

  return JSON.stringify(users);
};
