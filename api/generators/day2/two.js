const pokemon = require('./pokemon.json');
const { shuffle, sampleSize } = require('lodash');
const { getRandomInt } = require('../util');

exports.generate = () => {
  const num = getRandomInt(140, 385);

  return JSON.stringify(shuffle(sampleSize(pokemon, num).map(el => el.name)));
};
