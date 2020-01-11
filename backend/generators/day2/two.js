"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var pokemon_json_1 = __importDefault(require("./pokemon.json"));
var lodash_1 = require("lodash");
var util_1 = require("../util");
exports.generate = function () {
    var num = util_1.getRandomInt(140, 385);
    return JSON.stringify(lodash_1.shuffle(lodash_1.sampleSize(pokemon_json_1["default"], num).map(function (el) { return el.name; })));
};
