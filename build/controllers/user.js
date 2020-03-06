"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var user_1 = __importDefault(require("../models/user"));
var bcrypt = require('bcryptjs');
var dbConnection = require("../models/connection");
// return all user
exports.users = function (req, res) {
    dbConnection.query('SELECT * FROM clients', function (err, results, fields) {
        if (err)
            throw err;
        if (results) {
            return res.json(results);
        }
    });
};
// create user
exports.create = function (req, res) {
    var user = new user_1.default(req.body.name, req.body.lastname, req.body.username, req.body.email, req.body.password, req.body.age, req.body.birthday);
    dbConnection.query("SELECT * FROM clients WHERE username =" + user.username, function (err, results, fields) {
        if (err)
            throw err;
        if (!results[0]) {
            // hahs password
            bcrypt.genSalt(10, function (err, salt) {
                bcrypt.hash(user.password, salt, function (err, hash) {
                    // Store hash in your password DB.
                    user.password = hash;
                });
            });
            // si no existe creo cliente
            dbConnection.query('INSERT INTO clients SET ?', user, function (err, results, fields) {
                if (err)
                    throw err;
                // Good walk!
                if (results) {
                    return res.json({ message: 'User created.' });
                }
            });
        }
        else {
            return res.json({ message: 'User already created.' });
        }
    });
};
// delete user
exports.deleteUser = function (req, res) {
    var id = req.params.id;
    var VerifyExistsUser = dbConnection.query('SELECT * FROM clients WHERE id = ' + id);
    // verifico si el usuario existe
    if (VerifyExistsUser) {
        dbConnection.query('DELETE FROM clients WHERE id = ' + id, function (err, results, fields) {
            if (err)
                throw err;
            if (results) {
                return res.json({ message: 'User deleted.' });
            }
        });
    }
    else {
        return res.json({ message: 'Not user deleted with this id found in DB. Because not user created' });
    }
};
// search user
exports.findUser = function (req, res) {
    var id = req.params.id;
    dbConnection.query("SELECT * FROM clients WHERE id =" + id, function (err, results, fields) {
        if (err)
            throw err;
        if (results) {
            return res.json(results);
        }
        else {
            return res.json({ message: 'Not found user with this id.' });
        }
    });
};
// edit user
exports.edit = function (req, res) {
    var id = req.params.id;
    var user = new user_1.default(req.body.name, req.body.lastname, req.body.username, req.body.email, req.body.password, req.body.age, req.body.birthday);
    var UserVerify = dbConnection.query('SELECT * FROM clients WHERE username =' + user.username);
    // verifico si existe
    if (UserVerify) {
        // si no existe creo cliente
        dbConnection.query('UPDATE clients SET ? WHERE id = ?', [user, id], function (err, results, fields) {
            if (err)
                throw err;
            // Good walk!
            if (results) {
                return res.json({ message: 'User update correctly.' });
            }
        });
    }
    else {
        return res.json({ message: 'User already created.' });
    }
};
// login
exports.loginWithPasswordAndUsername = function (req, res) {
    var username = req.body.username;
    var pass = req.body.password;
    dbConnection.query("SELECT * FROM clients WHERE username=" + username, function (err, results, fields) {
        if (err)
            throw err;
        if (results) {
            bcrypt.compare(pass, results[0].password, function (err, result) {
                // res === false
                if (result) {
                    return res.json({ message: 'Logged.' });
                }
                else {
                    return res.json({ message: 'Password incorrect. ' });
                }
            });
        }
        else {
            return res.json({ message: 'Not found user with this id.' });
        }
    });
};
