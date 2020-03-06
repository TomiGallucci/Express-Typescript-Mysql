"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var User = /** @class */ (function () {
    function User(name, lastname, username, email, password, age, birthday) {
        this.name = name;
        this.lastname = lastname;
        this.username = username;
        this.email = email;
        this.password = password;
        this.age = age;
        this.birthday = birthday;
    }
    return User;
}());
exports.default = User;
