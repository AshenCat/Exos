const express = require('express');
const bcrypt = require('bcrypt');
const saltRounds = 10
const server = express.Router();
const passport = require("passport");

const model = require('../models/user');
const reservedUsernames = require('../config/reservedWords')

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
        if(reservedUsernames.indexOf(req.body.username.toLowerCase()) > -1) 
            res.json({msg: `Validation failed...`, payload: null})
        else if (req.body.username.length < 6 || req.body.username.length > 16 || req.body.username !== req.body.username.trim()) {
            //console.log("Fishyyy")
            res.json({msg: `Validation failed...`, payload: null})
        }
        else if (req.body.password.length < 8 || req.body.password.length > 20 || req.body.password !== req.body.password.trim()) {
            //console.log("Fishyy2")
            res.json({msg: `Validation failed...`, payload: null})
        }
        else 
        bcrypt.genSalt(saltRounds, (err, salt) => {
            if (err) {
                res.status(500);
                next(err)
            }
            bcrypt.hash(req.body.password, salt).then((hash) => {
                if (err) {
                    res.status(500);
                    next(err)
                }
                model.findOne({username: req.body.username},(err, data)=>{
                    if (err) {
                        res.status(500);
                        next(err)
                    }
                    if(!data){
                        // model.findOne({email: req.body.email}, (err, data) => {
                        //     if(!data) {
                                console.log(`Creating user : ${req.body.username}`)
                                model.create({
                                    username: req.body.username,
                                    password: hash,
                                    // email: req.body.email,
                                    access: 'user'
                                }).then((doc, err) =>{
                                    if (err) {
                                        res.status(500);
                                        next(err);
                                    }
                                    else res.json({msg: "User created", payload: {
                                        username: doc.username,
                                        // email: doc.email
                                    }})
                                })
                            // }
                            // else res.json({msg: `Email: '${req.body.email}' is already taken`, payload: null})
                        // })
                    } else res.json({msg: `Username: '${req.body.username}' is already taken`, payload: null})
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
        /*
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
        */
       //console.log(`posted`);
       passport.authenticate("local", (err,user,info) => {
           console.log(`Passport check user: ${user}`)
            if (err) {
                res.status(500);
                next(err)
            }
            if (!user) res.json({msg: "User not found", payload: null})
            else {
                req.logIn(user, err => {
                    //console.log(user)
                    if(err) throw err;
                    res.json({
                        msg:  "Successfully logged in!",
                        payload: req.user
                    }) 
                })
            }
       })(req,res,next)
    })

server.route('/:username')
    .get((req,res,next) => {
        model.findOne({username: req.params.username}, {}, (err, data) => {
            if(err) {
                res.status(500);
                next(err)
            }
            //console.log(data)
            else res.json({
                msg: !data ? `User: '${req.params.username}' not found` : "User found",
                payload: req.user ? req.user.access === 'admin' ? data : data.username : data ? data.username : data
            })
        })
    })

server.route('/auth')
    .post((req,res,next) => {
        console.log(`Trying to authenticate: ${req.user}`)
        if(!req.user) {
            res.json(null)
        }
        else {
            res.json({
                username: req.user.username,
                // email: req.user.email,
                access: req.user.access
            })
        }
    })

server.route('/logout')
    .post((req,res,next) => {
        req.logOut();
        res.json({
            msg: `Successfully logged out`,
            payload: null
        })
    })

module.exports = server;