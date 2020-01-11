"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var faker_1 = __importDefault(require("faker"));
var util_1 = require("../util");
var INTERVAL_LENGTH = 11; // in hours
var NUM_SECONDS_INTERVAL = INTERVAL_LENGTH * 60 * 60; // in seconds
var generateTime = function () {
    return util_1.getRandomInt(0, NUM_SECONDS_INTERVAL);
};
var makeNumberDoubleDigit = function (num) {
    if (num < 10)
        return '0' + num;
    return num;
};
var generateLine = function () {
    var email = faker_1["default"].internet.userName() + util_1.generateEmailDomain();
    return [
        faker_1["default"].name.firstName() + ' ' + faker_1["default"].name.lastName(),
        faker_1["default"].phone.phoneNumber(),
        email,
        generateTime(),
    ];
};
exports.generate = function () {
    var users = new Array(util_1.getRandomInt(480, 540)).fill(0).map(function (_) { return generateLine(); });
    // only care about generated time
    users.sort(function (_a, _b) {
        var _ = _a[0], __ = _a[1], ___ = _a[2], a = _a[3];
        var ____ = _b[0], _____ = _b[1], ______ = _b[2], b = _b[3];
        return a - b;
    });
    // -1 just prevents risk that I'm off by one and overflowed to the next day
    var intervalStart = util_1.getRandomInt(0, 24 - INTERVAL_LENGTH - 1);
    var usersWithTimeString = users.map(function (_a) {
        var name = _a[0], phone = _a[1], email = _a[2], oldTime = _a[3];
        // convert times to properly intervaled times
        var newTime = intervalStart * 60 * 60 + oldTime;
        var hours = Math.floor(newTime / 3600);
        var minutes = Math.floor((newTime - hours * 3600) / 60);
        var seconds = newTime - 60 * (hours * 60 + minutes);
        var newTimeString = makeNumberDoubleDigit(hours) + ":" + makeNumberDoubleDigit(minutes) + ":" + makeNumberDoubleDigit(seconds);
        return [name, phone, email, newTimeString];
    });
    usersWithTimeString.unshift(['Name', 'Phone', 'Email', 'Checkin']);
    return usersWithTimeString.map(function (el) { return el.join(','); }).join('\n');
};
