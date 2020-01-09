const quotes = require('./quotes');
const { sampleSize, shuffle } = require('lodash');

exports.generate = (length = 100) => {
  return JSON.stringify(
    shuffle(
      sampleSize(
        quotes.map(({ text, author }) => `${text} - ${author}`),
        length,
      ),
    ),
  );
};
