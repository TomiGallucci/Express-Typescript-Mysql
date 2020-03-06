export default class User {

    username: String;
    name: String;
    lastname: String;
    email: String;
    password: String;
    age: Number;
    birthday: Date;


    constructor(name: String, lastname: String, username: String, email: String, password: String, age: Number, birthday: Date) {
        this.name = name;
        this.lastname = lastname;
        this.username = username;
        this.email = email;
        this.password = password;
        this.age = age;
        this.birthday = birthday;
    }

}
