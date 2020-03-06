import express = require('express');
// Controllers (route handlers)
import * as userController from "../controllers/user";


const Routes = express.Router();

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