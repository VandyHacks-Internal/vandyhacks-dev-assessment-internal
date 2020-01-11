"use strict";
var one = [require('./day1/zero'), require('./day1/one'), require('./day1/two')];
var two = [require('./day2/zero'), require('./day2/one'), require('./day2/two')];
// day must be 1 or 2. level must be 0, 1 or, 2
var Day;
(function (Day) {
    Day[Day["One"] = 1] = "One";
    Day[Day["Two"] = 2] = "Two";
})(Day || (Day = {}));
var Level;
(function (Level) {
    Level[Level["One"] = 0] = "One";
    Level[Level["Two"] = 1] = "Two";
    Level[Level["Three"] = 2] = "Three";
})(Level || (Level = {}));
exports.getProblemInputData = function (day, level) {
    if (day === 1) {
        return one[level].generate();
    }
    else if (day === 2) {
        return two[level].generate();
    }
    throw new Error('Day is invalid!');
};
exports.getAllProblemsInputData = function (day) {
    if (day === 1) {
        return new Object(one.map(function (el) { return el.generate(); }));
    }
    else if (day === 2) {
        return new Object(two.map(function (el) { return el.generate(); }));
    }
    throw new Error('Day is invalid!');
};
