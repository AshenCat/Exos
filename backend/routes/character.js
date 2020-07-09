let express = require('express');

let server = express.Router();
let character = require('../models/character')

server.route('/')
    .get((req, res, next)=>{
        character.find({}).then((doc, err)=>{
            if(err) {
                res.status(200)
                next(err);
            }
            else res.json({
                msg: "",
                payload: doc
            })
        })
    })
    .put((req, res, next) => {
        if(character.name === null || character.role === null || character.nation === null || character.tier === "-----" ||
         character.element === "-----" || character.race === null || character.position === null || character.type === null ||
         character.skills.passive.name === null || character.passive.description === [])
        console.log("err")
        console.log(req.data)
        //character.create({})
        res.json("aw")
    })




module.exports = server;