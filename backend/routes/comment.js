const express = require('express');
const mongoose = require('mongoose')
const comment = require('../models/comment')
const server = express.Router();

server.route('/character/:charid')
    .get((req, res, next) => {
        const id = mongoose.Types.ObjectId(req.params.charid)
        comment.model.find({character: id}, (err, doc) => {
            if (err) {
                res.status(500);
                next(err);
            }
            else res.json({msg: "", payload: doc})
        })
    })
    .put((req, res, next) => {
        if(req.user){
            req.body.user = req.user.username;
            req.body.userId = req.user._id;
            if (req.body.childOf === null) {
                delete req.body.childOf;
                comment.model.create(req.body, (err, doc) => {
                    if (err) {
                        res.status(500);
                        next(err);
                    }
                    else res.json({msg: "Created a comment...", payload: doc})
                })
            }
            else {
                comment.model.findOne({_id: req.body.childOf}, (err, doc)=>{
                    delete req.body.childOf;
                    if (err) {
                        res.status(500);
                        next(err);
                    }
                    else if (!doc) {
                        res.json({msg: "Comment not found...", payload: null})
                    }
                    else {
                        doc.subComments.push(req.body);
                        doc.save();
                        res.json({msg: "Successfully Replied", payload: doc})
                    }
                })
            }
        }
        else res.json({msg: "You are not logged in...", payload: null})    
    })

server.route('/vote/:commentid')
    .patch((req, res, next) => {
        if(req.user){
            comment.model.findOne(mongoose.Types.ObjectId(req.params.commentid), (err, doc) => {
                if (err){
                    res.status(500);
                    next(err);
                }
                else if (!doc) res.json({msg: "Comment not found", payload: null})
                else {
                    let id = null;
                    let vote = null;
                    doc.userVotes.forEach(userVote => {
                        if(userVote.userId.toString() === req.user._id.toString()){
                            id = userVote._id;
                            vote = userVote.vote;
                            return;
                        } 
                    })
                    if(id) {
                        doc.points = vote === "up" ? doc.points - 1 : doc.points + 1;
                        doc.userVotes.id(id).remove();
                    }
                    doc.userVotes.push({userId: req.user._id, vote: req.body.vote});
                    doc.points = req.body.vote === "up" ? doc.points + 1 : doc.points -1;
                    doc.save();
                    res.json({msg:`Voted ${req.body.vote}...`, payload: doc})
                }
            })
        }
        else res.json({msg: "You are not logged in...", payload: null})    
    })
    
server.route('/search/:commentid/:subcommentid')
    .delete((req, res, next) => {
        if (req.user && req.user.access === "admin") {
            if(req.params.subcommentid !== "null"){
                comment.model.findOne({_id: mongoose.Types.ObjectId(req.params.commentid)}, (err, doc)=>{
                    if (err) {
                        res.status(500)
                        next(err);
                    }
                    else if (!doc) res.json({msg: "Comment not found...", payload: null})
                    else {
                        doc.subComments.id(req.params.subcommentid).remove();
                        doc.save();
                        res.json({msg: "Successfully deleted subcomment...", payload: null})
                    }
                })
            }
            else {
                comment.model.findByIdAndDelete(mongoose.Types.ObjectId(req.params.commentid), (err, doc) => {
                    if (err) {
                        res.status(500);
                        next(err);
                    }
                    else if (!doc) res.json({msg: "Comment not found...", payload: null})
                    else res.json({msg: "Successfully deleted comment...", payload: null})
                })
            }
        }
        else res.json({msg: "you are not logged in...", payload: null})
    })


module.exports = server;