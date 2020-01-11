"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var util_1 = require("../util");
var faker_1 = __importDefault(require("faker"));
var VEGAN_CHANCE = 0.38;
var GLUTEN_FREE = 0.12;
var NUT_ALLERGY = 0.05;
var SOY_ALLERGY = 0.06;
var GUAVAS = 0.012;
var generateEntry = function () {
    var email = faker_1["default"].internet.userName() + util_1.generateEmailDomain();
    var allergyList = [];
    var rand = Math.random();
    if (rand < NUT_ALLERGY)
        allergyList.push('Nuts');
    if (rand < SOY_ALLERGY)
        allergyList.push('Soybeans');
    if (rand < GUAVAS)
        allergyList.push('Guavas');
    return {
        name: faker_1["default"].name.firstName() + ' ' + faker_1["default"].name.lastName(),
        phone: faker_1["default"].phone.phoneNumber(),
        email: email,
        isVegan: rand < VEGAN_CHANCE,
        glutenFree: rand < GLUTEN_FREE,
        allergies: allergyList.join(',')
    };
};
exports.generate = function () {
    var users = new Array(util_1.getRandomInt(80, 120)).fill(0).map(function (_) { return generateEntry(); });
    var a = 'hi';
    a = 2;
    return JSON.stringify(users);
};
