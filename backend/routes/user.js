const express = require('express');
const bcrypt = require('bcrypt');
const saltRounds = 10
const server = express.Router();

const model = require('../models/user');

// don't forget to 
server.route('/')
    // return
    .get((req,res,next)=>{
        model.find({},(err, data) => {
            if(err) {
                res.status(500);
                next(err);
            } 
            else {
                res.json({
                    msg: !data.length ? "0 users found" : `Fetched ${data.length} users`,
                    payload: data
                })
            }
        })
    })
    .put((req,res,next) =>{
        bcrypt.genSalt(saltRounds, (err, salt) => {
            if(err) {
                res.status(500);
                next(err)
            }
            bcrypt.hash(req.body.password, salt, (err, hash) => {
                if(err) {
                    res.status(500);
                    next(err);
                }
                model.findOne({username: req.body.username},(err, data)=>{
                    if (err) {
                        res.status(500);
                        next(err);
                    }
                    if(!data){
                        model.findOne({email: req.body.email}, (err, data) => {
                            if (err) {
                                res.status(500);
                                next(err);
                            }
                            if(!data) {
                                model.create({
                                    username: req.body.username,
                                    password: hash,
                                    email: req.body.email
                                }).then((doc, err) =>{
                                    if (err) {
                                        res.status(500);
                                        next(err);
                                    }
                                    else {
                                        res.json({
                                            msg: "User created",
                                            payload: doc
                                        })
                                    }
                                })
                            }
                            else {
                                res.json({
                                    msg: `Email: '${req.body.email}' is already taken`,
                                    payload: null
                                })
                            }
                        })
                    } else {
                        res.json({
                            msg: `Username: '${req.body.username}' is already taken`,
                            payload: null
                        })
                    }
                })
            })
        })
    })
    .patch((req,res,next)=>{
        res.send('patch')
    })
    .delete((req,res,next)=>{
        res.send('delete')
    })
    .post((req,res,next) => {
        model.find(req.body, (err, data)=>{
            if (err) {
                res.status(500);
                next(err)
            }
            res.json({
                msg: !data ? "User not found" : "Successfully logged in!",
                payload: !data ? null : data
            })    
        })
    })

server.route('/:username')
    .get((req,res,next) => {
        model.findOne({username: req.params.username}, {}, (err, data) => {
            if(err) {
                res.status(500);
                next(err)
            }
            res.json({
                msg: !data ? `User: '${req.params.username}' not found` : "User found",
                payload: data
            })
        })
    })

module.exports = server;