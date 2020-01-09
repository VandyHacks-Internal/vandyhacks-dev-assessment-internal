const quotes = require('./quotes');
const { sampleSize, shuffle } = require('lodash');

exports.generate = (length = 100) => {
  return shuffle(sampleSize(quotes, length));
};
