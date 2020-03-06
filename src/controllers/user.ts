import { Request, Response } from "express";
import User from '../models/user';
const bcrypt = require('bcryptjs');
const dbConnection  = require ("../models/connection");


// return all user
export let users = (req: Request, res: Response) => {

    dbConnection.query('SELECT * FROM clients', function(err: any,results: any,fields: any){
        if(err) throw err;

        if(results){
          return  res.json(results);
        }
    })

   
};
// create user
export let create = (req: Request, res: Response) => {
    let user = new User(req.body.name, req.body.lastname, req.body.username, req.body.email, req.body.password, req.body.age, req.body.birthday);

   dbConnection.query(`SELECT * FROM clients WHERE username =${user.username}`, function(err: any, results: any, fields:any){

        if(err) throw err;

        if(!results[0]){
        // hahs password
        bcrypt.genSalt(10, function(err: any, salt: any) {
            bcrypt.hash(user.password, salt, function(err: any, hash: any) {
                // Store hash in your password DB.
                user.password = hash;
            });
        });

        // si no existe creo cliente
    dbConnection.query('INSERT INTO clients SET ?', user , function(err: any, results: any, fields: any){
        if (err) throw err;
        // Good walk!
        if(results) {
            return   res.json({ message: 'User created.'});
        }
    });

    }else{
        return res.json({message: 'User already created.'})
    }


   });

};
// delete user
export let deleteUser = (req: Request, res: Response) => {

    let id = req.params.id;

    const VerifyExistsUser = dbConnection.query('SELECT * FROM clients WHERE id = '+id);
    // verifico si el usuario existe
    if(VerifyExistsUser){

        dbConnection.query('DELETE FROM clients WHERE id = '+id, function(err: any, results: any, fields: any){

            if (err) throw err;

            if (results){
                return res.json({message: 'User deleted.'})
            }
            
        })

    }else{

        return res.json({ message: 'Not user deleted with this id found in DB. Because not user created'});
    }

};
// search user
export let findUser = (req: Request, res: Response) =>{

    let id = req.params.id;

    dbConnection.query(`SELECT * FROM clients WHERE id =${id}`, function(err: any, results: any, fields: any){

        if (err) throw err;

        if (results){
            return res.json(results);
        }else{
            return res.json({ message: 'Not found user with this id.'})
        }

    });

};

// edit user
export let edit = (req: Request, res: Response) => {
    let id =  req.params.id;
    let user = new User(req.body.name, req.body.lastname, req.body.username, req.body.email, req.body.password, req.body.age, req.body.birthday);

    const UserVerify = dbConnection.query('SELECT * FROM clients WHERE username ='+user.username);
    // verifico si existe
    if(UserVerify){

  
        // si no existe creo cliente
        dbConnection.query('UPDATE clients SET ? WHERE id = ?', [user, id] , function(err: any, results: any, fields: any){
            if (err) throw err;
            // Good walk!
            if(results) {
            return   res.json({ message: 'User update correctly.'});
            }
        })
    }else{
        return res.json({message: 'User already created.'})
    }
};

// login
export let loginWithPasswordAndUsername = (req: Request, res: Response) =>{

    let username = req.body.username;
    let pass = req.body.password;

    dbConnection.query(`SELECT * FROM clients WHERE username=${username}`, function(err: any, results: any, fields: any){

        if (err) throw err;

        if (results){
            
            bcrypt.compare(pass, results[0].password, function(err : any, result: any) {
                // res === false
                if(result){

                    return res.json({ message: 'Logged.'})

                }else {
                    return res.json({ message: 'Password incorrect. '})
                }

            });

        }else{
            return res.json({ message: 'Not found user with this id.'})
        }

    });

};

