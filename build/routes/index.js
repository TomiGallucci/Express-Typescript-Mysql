"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var Routes = express.Router();
Routes.get('/', function (req, res) {
    res.send("hello world");
});
module.exports = Routes;
