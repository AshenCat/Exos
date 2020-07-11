import React from 'react';
import {Route} from 'react-router-dom'
import Home from './pages/Home';
import Characters from './pages/Characters';
import ViewCharacter from './pages/ViewCharacter';
import Register from './pages/Register';
import CharacterForm from './pages/CharacterForm';

class Content extends React.Component {
    state = { 
        characters: [{
            _id: 1,
            name: "Garff",
            role: "Paladin",
            sex: "Male",
            nation: "Saint West",
            tier: "Fated",
            element: "Light",
            age: "55",
            race: "Dwarf",
            position: "Defense",
            type: "Physical",
            title: "",
            description: "The first of the Five Greatest Generals of Saint West. While Garff was born a commoner, he was always interested in war and dreamed of becoming a general. To realize his dream, Garff studied strategies and writings of great commanders.\n\nWhen he was old enough, Garff joined the army. He earned respect through self-management and Outstanding abilities, despite his humble background. Valarr, who had taken an interest in Garff, recommended him for the knighthood.\n \nThough Garff became a knight at a relatively late age, he was able to rise to the rank of general in a short time after defeating Valarr in a jousting competition and gaining the favor of the King. After becoming a general, Garff made a name for himself from his contributions in the war against Bronn and became the First of the Five Greatest Generals.\n \nHowever, the King was killed in a revolt led by Carrie and the capital fell into the rebels. Now Garff is avoiding Valarr's pursuit and gathering forces in preparation for Rachel's return.",
            skills: {
                passive: { name: "Protect 3", description: ["Grants Share Health to ally with the lowest maximum Health and heals their Health by 30% of the caster's current Health at the beginning of the round\nGain Mana(1 mana) if Health of the target is less than 20%\nGain(1 mana) if Health of target is more than 70%", "[Breath of Mana]\n[Over Time Effect] Front row allies permanently gain 1 mana", "[Command]\nGrants allies with lower maximum Health than self with the Comman mark and increases Defense/Health by 20%"]},
                active1: { name: "Eagle Blow", cost: 2, description: ["[Single] Deals 375% damage to 1 enemy"]},
                active2: { name: "General's Call", cost: 5, description: ["[Back Row First] Deals 420% damage to all back row enemies"]}
            },
            maxStats: [{
                level: 100,
                power: 282000,
                HP: 6816,
                attack: 809,
                defense: 1540,
                hit: 100,
                dodge: 99,
                criticalHit: 120,
                block: 210,
                attackSpeed: 56,
                criticalDamage: 150,
                blockDefenceRate: 50,
                luck: 0
            }],
            // comments: [{
            //     user: "TOP KEK",
            //     comment: "kekkers bruh...",
            //     timestamp: new Date(),
            //     patch: "Zeon"
            // }]
        },
        {
            _id: 2,
            name: "Rachel",
            role: "Warrior",
            sex: "Male",
            nation: "Saint West",
            tier: "Fated",
            element: "Fire",
            age: "19",
            race: "Human",
            position: "Attack",
            type: "Physical",
            description: "King's Guard of Saint West",
            skills: {
                passive: { name: "Protect 3", description: "Grants Share Health to ally with the lowest maximum Health and heals their Health by 30% of the caster's current Health at the beginning of the round\nGain Mana(1 mana) if Health of the target is less than 20%\nGain(1 mana) if Health of target is more than 70%\n\n[Breath of Mana]\n[Over Time Effect] Front row allies permanently gain 1 mana\n\n[Command]\nGrants allies with lower maximum Health than self with the Comman mark and increases Defense/Health by 20%"},
                active1: { name: "Eagle Blow", cost: 2, description: "[Single] Deals 375% damage to 1 enemy"},
                active2: { name: "General's Call", cost: 5, description: "[Back Row First] Deals 420% damage to all back row enemies"}
            },
            maxStats: {
                level: 100,
                power: 282000,
                HP: 6816,
                attack: 809,
                defense: 1540,
                hit: 100,
                dodge: 99,
                criticalHit: 120,
                block: 210,
                attackSpeed: 56,
                criticalDamage: 150,
                blockDefenceRate: 50,
                luck: 0
            }
        },
        {
            _id: 3,
            name: "Bathory",
            role: "Wizard",
            sex: "Female",
            nation: "Green Land",
            tier: "Fated",
            element: "Frost",
            age: "21",
            race: "Elf",
            position: "Attack",
            type: "Magical",
            description: "King's Guard of Green Land",
            skills: {
                passive: { name: "Protect 3", description: "Grants Share Health to ally with the lowest maximum Health and heals their Health by 30% of the caster's current Health at the beginning of the round\nGain Mana(1 mana) if Health of the target is less than 20%\nGain(1 mana) if Health of target is more than 70%\n\n[Breath of Mana]\n[Over Time Effect] Front row allies permanently gain 1 mana\n\n[Command]\nGrants allies with lower maximum Health than self with the Comman mark and increases Defense/Health by 20%"},
                active1: { name: "Eagle Blow", cost: 2, description: "[Single] Deals 375% damage to 1 enemy"},
                active2: { name: "General's Call", cost: 5, description: "[Back Row First] Deals 420% damage to all back row enemies"}
            },
            maxStats: {
                level: 100,
                power: 282000,
                HP: 6816,
                attack: 809,
                defense: 1540,
                hit: 100,
                dodge: 99,
                criticalHit: 120,
                block: 210,
                attackSpeed: 56,
                criticalDamage: 150,
                blockDefenceRate: 50,
                luck: 0
            }
        }]
     }

    
    
    render() { 
    return ( 
    <div style={{/*backgroundColor: "blue"*/}}> 
        <Route exact path='/' component={Home} />
        <Route exact path='/Characters' component={Characters} />
        <Route path='/Characters/Add' component={CharacterForm} />
        <Route path='/Characters/Edit/:tier/:name' component={CharacterForm} />
        <Route exact path='/Characters/View/:tier/:name' component={ViewCharacter} />
        <Route path='/Register' component={Register} />
    </div> 
     );
    }
}
 
export default Content;