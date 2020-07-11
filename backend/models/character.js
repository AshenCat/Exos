const mongoose = require('mongoose')

const Schema = mongoose.Schema;

let reqString = {
    type: String,
    required: true
}

let characterSchema = new Schema({
    name: reqString,
    role: {
        type: String,
        required: true,
        enum: ['warrior', 'wizard', 'enchanter', 'cleric', 'guardian', 'knight', 'paladin', 'ranger', 'assassin', 'trickster']
    },
    sex: String,
    nation: reqString,
    tier: reqString,
    element: {
        type: String,
        required: true,
        enum: ['dark', 'light', 'machine', 'nature', 'frost', 'fire']
    },
    age: String,
    race: reqString,
    position: {
        type: String,
        required: true,
        enum: ['attack', 'chaos', 'defense', 'support']
    },
    type: {
        type: String,
        required: true,
        enum: ['physical', 'magical']
    },
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