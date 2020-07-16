const express = require('express');
const mongoose = require('mongoose')
const comment = require('../models/comment')
const vote = require('../models/vote')
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
                else res.json({msg: "Created a comment...", payload: doc})
            })
        }
        else res.json({msg: "You are not logged in...", payload: null})    
    })

server.route('/vote/:commentid')
    .patch((req, res, next) => {
        if(req.user){
            vote.findOne({userId: req.user._id, comment: mongoose.Types.ObjectId(req.params.commentid)}, (err, voteDoc) =>{
                if(err) {
                    res.status(500);
                    next(err);
                }
                else comment.findById(req.params.commentid, (err, commentDoc) => {
                        if(err) {
                            res.status(500);
                            next(err);
                        }
                        else if (commentDoc) {
                            //if the user already voted...
                            console.log("Comment found: ")
                            if(voteDoc){
                                if(voteDoc.vote === req.body.vote)
                                    res.json({msg: "Already voted...", payload: commentDoc.points})
                                else {
                                    console.log("Changed vote...")
                                    commentDoc.points = req.body.vote === "up" ? commentDoc.points + 2 : commentDoc.points - 2;
                                    voteDoc.vote = voteDoc.vote === "up" ? "down" : "up";
                                    voteDoc.save();
                                    commentDoc.save();
                                    res.json({msg: "Vote modified...", payload: commentDoc.points})
                                }
                            } 
                            //first time vote
                            else {
                                vote.create({comment: mongoose.Types.ObjectId(req.params.commentid), userId: req.user._id, vote: req.body.vote}, (err, doc) => {
                                    if (err){
                                        res.status(200);
                                        next(err);
                                    }
                                    else {
                                        console.log("Voted...")
                                        commentDoc.points = req.body.vote === "up" ? commentDoc.points + 1 : commentDoc.points - 1;
                                        commentDoc.save();
                                        res.json({msg: "Vote submitted...", payload: commentDoc.points})
                                    }
                                })
                            }
                        }
                        else res.json({msg: "comment not found...", payload: null})
                    })
            })
        }
        else res.json({msg: "You are not logged in...", payload: null})    
    })
module.exports = server;