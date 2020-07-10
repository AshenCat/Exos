const mongoose = require('mongoose')

const Schema = mongoose.Schema;

let reqString = {
    type: String,
    required: true
}

let characterSchema = new Schema({
    name: reqString,
    role: reqString,
    sex: String,
    nation: reqString,
    tier: {
        type: String,
        enum: ['fatecore' ,'fated', 'legendary', 'rare', 'magic', 'common'],
        required: true
    },
    element: reqString,
    age: String,
    race: reqString,
    position: reqString,
    type: reqString,
    title: String,
    description: String,
    skills: {
        passive: {name:reqString, description:{type: [String], required: true}},
        active1: {name:reqString, cost: {type: Number, min:0, max:5}, description:{type: [String], required: true}, isBurst: Boolean},
        active2: {name:reqString, cost: {type: Number, min:0, max:5}, description:{type: [String], required: true}, isBurst: Boolean}
    },
    maxStats: [{
        level: Number,
        power: Number,
        HP: Number,
        attack: Number,
        defense: Number,
        hit: Number,
        dodge: Number,
        criticalHit: Number,
        block: Number,
        attackSpeed: Number,
        criticalDamage: Number,
        blockDefenceRate: Number,
        luck: Number
    }]
}, {timestamps: true})

module.exports = mongoose.model("Characters", characterSchema);