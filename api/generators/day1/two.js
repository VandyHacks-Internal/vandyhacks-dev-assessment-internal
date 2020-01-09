const { getRandomInt } = require('../util');
const faker = require('faker');

exports.generate = () => {
  const length = getRandomInt(140, 385);

  return new Array(length).map(_ => faker.date.between('2002-01-01', '2020-01-05'));
};
