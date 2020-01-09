const one = [require('./day1/zero'), require('./day1/one'), require('./day1/two')];

const two = [require('./day2/zero'), require('./day2/one'), require('./day2/two')];

// day must be 1 or 2. level must be 0, 1 or, 2
exports.getProblemInputData = (day, level) => {
  if (day === 1) {
    return one[level].generate();
  } else if (day === 2) {
    return two[level].generate();
  }

  throw new Error('Day is invalid!');
};

exports.getAllProblemsInputData = day => {
  if (day === 1) {
    return new Object(one.map(el => el.generate()));
  } else if (day === 2) {
    return new Object(two.map(el => el.generate()));
  }

  throw new Error('Day is invalid!');
};
