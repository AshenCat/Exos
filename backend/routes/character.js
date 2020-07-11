let express = require('express');

let server = express.Router();
let model = require('../models/character')

server.route('/')
    .get((req, res, next)=>{
        model.find({}).then((doc, err)=>{
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
            console.log(req.data);
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
    });

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
                        msg: `${doc.tier} - ${doc.name} is found`,
                        payload: null
                    })
                }
            })
        else res.send("no data")
    })


module.exports = server;