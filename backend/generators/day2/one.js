"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var faker_1 = __importDefault(require("faker"));
var util_1 = require("../util");
var generateBusRoute = function () {
    var possibilities = ['GT', 'IIT', 'Purdue', 'UIUC'];
    var rand = Math.random();
    if (rand < 0.4)
        return possibilities[0];
    if (rand < 0.6)
        return possibilities[1];
    if (rand < 0.74)
        return possibilities[2];
    return possibilities[3];
};
var generateLine = function (showupFrequency) {
    var email = faker_1["default"].internet.userName() + util_1.generateEmailDomain();
    return [
        faker_1["default"].name.firstName() + ' ' + faker_1["default"].name.lastName(),
        faker_1["default"].phone.phoneNumber(),
        email,
        generateBusRoute(),
        true,
        Math.random() < showupFrequency,
    ];
};
exports.generate = function () {
    var showupFrequency = Math.random() * 0.55 + 0.45; // between .45 and 1
    var users = new Array(util_1.getRandomInt(80, 120))
        .fill(0)
        .map(function (_) { return generateLine(showupFrequency).join(','); });
    users.unshift(['Name', 'Phone', 'Email', 'BusRoute', 'PaidDeposit', 'ShowedUp'].join(','));
    return users.join('\n');
};
