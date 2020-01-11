"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var faker_1 = __importDefault(require("faker"));
var util_1 = require("../util");
var generateEntry = function (vanderbiltFrequency) {
    var email = faker_1["default"].internet.userName() + util_1.generateEmailDomain(vanderbiltFrequency);
    return {
        name: faker_1["default"].name.firstName() + ' ' + faker_1["default"].name.lastName(),
        phone: faker_1["default"].phone.phoneNumber(),
        email: email
    };
};
exports.generate = function () {
    var vanderbiltFrequency = Math.random() * 0.8 + 0.2; // from .2 to 1
    var users = new Array(util_1.getRandomInt(82, 123))
        .fill(0)
        .map(function (_) { return generateEntry(vanderbiltFrequency); });
    return JSON.stringify(users);
};
