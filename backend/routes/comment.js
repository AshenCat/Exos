const express = require('express');
const mongoose = require('mongoose')
const comment = require('../models/comment')
const server = express.Router();

server.route('/')
    .get((req, res, next) => {
        comment.find({}, (err, doc) => {
            if (err) {
                res.status(500);
                next(err);
            }
            else res.json({msg: "", payload: doc})
        })
    })

server.route('/character/:charid')
    .get((req, res, next) => {
        const id = mongoose.Types.ObjectId(req.params.charid)
        comment.find({character: id}, (err, doc) => {
            if (err) {
                res.status(500);
                next(err);
            }
            else res.json({msg: "", payload: doc})
        })
    })
    .put((req, res, next) => {
        // console.log(req.user)
        if(req.user){
            req.body.user = req.user.username;
            req.body.userId = req.user._id;
            comment.create(req.body, (err, doc) => {
                if (err) {
                    res.status(500);
                    next(err);
                }
                else res.json({msg: "", payload: doc})
            })
        }
        else res.json({msg: "You are not logged in...", payload: null})    
    })

module.exports = server;