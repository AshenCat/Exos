let express = require('express');

let server = express.Router();
let model = require('../models/character')

server.route('/')
    .get((req, res, next)=>{
        model.find({}, "name tier role element type").then((doc, err)=>{
            if(err) {
                res.status(500)
                next(err);
            }
            else res.json({
                msg: "",
                payload: doc
            })
        })
    })
    .put((req, res, next) => {
        if(req.user) {
            const character = req.body
            // console.log(character)
            if(character === null || character.name === "" || character.role === "" || character.nation === "" || character.tier === "-----" ||
             character.element === "-----" || character.race === "" || character.position === "" || character.type === ""){
                // console.log("ewwww")
                res.json({msg: "Check character info", payload: null})
             }
            else if(character.skills.passive.name === "" || character.skills.passive.description === [] || character.skills.active1.name === "" ||
             character.skills.active1.cost === "" || character.skills.active1.cost > 5 || character.skills.active1.cost < 0 || character.skills.active1.description === [] || character.skills.active2.name === "" ||
             character.skills.active2.cost === "" || character.skills.active2.cost > 5 || character.skills.active2.cost < 0 || character.skills.active2.description === []){
                // console.log("arghhh")
                res.json({msg: "check character skills", payload: null})
             }
            else{
                // console.log(req.data);
                model.findOne({name: character.name, tier: character.tier}, (err, doc) => {
                    if(err) {
                        res.status(500);
                        next(err);
                    }
                    else if (doc) {
                        res.json({msg: `${character.tier} - ${character.name} already exists`, payload: null})
                    }
                    else {
                        model.create(character, (err, data) =>{
                            if(err) {
                                res.status(500);
                                // console.log("----------------------------------------------------")
                                // console.log(err);
                                // console.log("----------------------------------------------------")
                                next(err);
                            }
                            else res.json({
                                msg: "Successfully added new character",
                                payload: data.name
                            })
                        })
                    }
                })
            }
        }
        else res.json({msg: 'You are not logged in', payload: null})
    })
    .patch((req, res, next) => {
        if(req.user){
            const character = req.body
            // console.log(character)
            if(character === null || character.name === "" || character.role === "" || character.nation === "" || character.tier === "-----" ||
             character.element === "-----" || character.race === "" || character.position === "" || character.type === ""){
                // console.log("ewwww")
                res.json({msg: "Check character info", payload: null})
             }
            else if(character.skills.passive.name === "" || character.skills.passive.description === [] || character.skills.active1.name === "" ||
             character.skills.active1.cost === "" || character.skills.active1.cost > 5 || character.skills.active1.cost < 0 || character.skills.active1.description === [] || character.skills.active2.name === "" ||
             character.skills.active2.cost === "" || character.skills.active2.cost > 5 || character.skills.active2.cost < 0 || character.skills.active2.description === []){
                // console.log("arghhh")
                res.json({msg: "Check character skills", payload: null})
            }
            else {
                model.findOne({name:character.name, tier: character.tier}, (err, doc) => {
                    if(err) {
                        res.status(500);
                        next(err);
                    }
                    else if (doc) res.json({msg: `${doc.tier} - ${doc.name} already exists`})
                    else model.findByIdAndUpdate(character._id, character, (err, doc) => {
                        if(err) {
                            res.status(500);
                            next(err);
                        }
                        else if (!doc) res.json({
                            msg: `Reference not found. Delete and Recreate the character...`, 
                            payload: null
                        })
                        else res.json({
                            msg: `Successfully changed the character!`,
                            payload: doc.name
                        })
                    })
                })
            }
        }
        else res.json({msg: "You are not logged in", payload: null})
    })

server.route('/id/:id')
    .delete((req, res, next) => {
        if(req.user){
            const id = req.params.id;
            model.findByIdAndDelete(id, (err, doc)=>{
                if(err) {
                    res.status(500);
                    next(err);
                }
                else if(doc) res.json({msg: `Successfully deleted ${doc.tier} - ${doc.name}`})
                else res.json({msg: `not found`, payload: null})
            })
        }
        else res.json({msg: "You are not logged in", payload: null})
    })

server.route('/:tier/:name')
    .get((req, res, next) => {
        const tier = req.params.tier;
        const name = req.params.name;
        if(tier && name) 
            model.findOne({tier, name}, (err, doc) => {
                if(err) {
                    res.status(500);
                    next(err);
                }
                else if (doc) {
                    res.json({
                        msg: `${doc.tier} - ${doc.name} is found`,
                        payload: doc
                    })
                } else {
                    res.json({
                        msg: `${tier} - ${name} is found`,
                        payload: null
                    })
                }
            })
        else res.send("no data")
    })
    


module.exports = server;