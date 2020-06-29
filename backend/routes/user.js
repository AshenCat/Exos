const express = require('express');
const server = express.Router();

const model = require('../models/user');

// don't forget to 

server.route('/manage')
    // return
    .get((req,res,next)=>{
        model.find({}, (err, data) => {
            if(err) {
                res.status(500);
                next(err);
            } else if (data === null) {
                res.json({msg:"not found", payload: null})
            } else{
                res.json({
                    message: "",
                    payload: data
                })
            }
        })
    })
    .put((req,res,next) =>{
        res.send('put')
    })
    .patch((req,res,next)=>{
        res.send('patch')
    })
    .delete((req,res,next)=>{
        res.send('delete')
    })

module.exports = server;