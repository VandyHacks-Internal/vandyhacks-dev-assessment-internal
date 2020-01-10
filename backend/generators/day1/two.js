const { getRandomInt } = require('../util');
const faker = require('faker');
const { format } = require('date-fns');

exports.generate = () => {
  return JSON.stringify(
    new Array(getRandomInt(140, 385))
      .fill(0)
      .map(_ => format(faker.date.between('2002-01-01', '2020-01-05'), 'yyyy-MM-dd')),
  );
};
