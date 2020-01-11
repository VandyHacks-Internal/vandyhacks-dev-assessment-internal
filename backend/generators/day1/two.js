"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var util_1 = require("../util");
var faker_1 = __importDefault(require("faker"));
var date_fns_1 = require("date-fns");
exports.generate = function () {
    return JSON.stringify(new Array(util_1.getRandomInt(140, 385))
        .fill(0)
        .map(function (_) { return date_fns_1.format(faker_1["default"].date.between('2002-01-01', '2020-01-05'), 'yyyy-MM-dd'); }));
};
