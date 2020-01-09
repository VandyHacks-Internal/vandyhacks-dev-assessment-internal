const quotes = require('./quotes');
const { sampleSize, shuffle } = require('lodash');
const { getRandomInt } = require('../util');

exports.generate = () => {
  return JSON.stringify(
    shuffle(
      sampleSize(
        quotes.map(({ text, author }) => `${text} - ${author}`),
        getRandomInt(80, 120),
      ),
    ),
  );
};
