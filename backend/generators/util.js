"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var faker_1 = __importDefault(require("faker"));
function generateEmailDomain(vanderbiltFrequency) {
    if (vanderbiltFrequency === void 0) { vanderbiltFrequency = 0.23; }
    if (Math.random() < vanderbiltFrequency)
        return '@vanderbilt.edu';
    // everything from this point on is proportional to 1-vanderbiltFrequency
    var rand = Math.random();
    if (rand < 0.15) {
        return '@gatech.edu';
    }
    else if (rand < 0.32) {
        return '@purdue.edu';
    }
    else if (rand < 0.6) {
        return '@gmail.com';
    }
    else if (rand < 0.8) {
        return '@' + faker_1["default"].internet.domainName();
    }
    else if (rand < 1) {
        return '@hotmail.com';
    }
    return '@yahoo.com';
}
exports.generateEmailDomain = generateEmailDomain;
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
exports.getRandomInt = getRandomInt;
