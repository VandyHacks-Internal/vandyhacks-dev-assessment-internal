const { getRandomInt } = require('../util');
const faker = require('faker');
const { format } = require('date-fns');

exports.generate = () => {
  const length = getRandomInt(140, 385);

  return JSON.stringify(
    new Array(length)
      .fill(0)
      .map(_ => format(faker.date.between('2002-01-01', '2020-01-05'), 'yyyy-MM-dd')),
  );
};
