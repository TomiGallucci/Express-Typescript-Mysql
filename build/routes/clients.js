"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
// Controllers (route handlers)
var userController = __importStar(require("../controllers/user"));
var Routes = express.Router();
// Show All user
Routes.get('/', userController.users);
// Register
Routes.post('/register', userController.create);
// Login
Routes.post('/login', userController.loginWithPasswordAndUsername);
// Edit
Routes.post('/edit/:id', userController.edit);
// Show One User
Routes.get('/user/:id', userController.findUser);
// Delete User
Routes.delete('/user/:id', userController.deleteUser);
module.exports = Routes;
