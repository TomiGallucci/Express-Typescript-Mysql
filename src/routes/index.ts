import express = require('express');

const Routes = express.Router();
Routes.get('/',function(req,res){
    res.send("hello world");
})
module.exports = Routes;