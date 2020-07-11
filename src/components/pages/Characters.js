import React from 'react';
import {withRouter, Link} from 'react-router-dom';
import {Card, Row} from 'react-bootstrap';
import { UserContext } from '../../App';
import axios from 'axios'

const Characters = (props) => {
    const user = React.useContext(UserContext);
    const [characters, setCharacters] = React.useState([]);

    React.useEffect(() => {
        axios.get('http://localhost:7172/api/character/').then((res) =>{
            console.log(res.data.payload)
            setCharacters(res.data.payload)
        }).catch((err)=> console.log(err))
    }, [])

    const characterList = characters.length ? (
        characters.map(character => {
            const element = character.element.charAt(0).toUpperCase() + character.element.substring(1);
            const tier = character.tier.charAt(0).toUpperCase() + character.tier.substring(1);
            const role = character.role.charAt(0).toUpperCase() + character.role.substring(1);
            const type = character.type.charAt(0).toUpperCase() + character.type.substring(1);
            let image = null;
            try {
                image = require("./img/" + character.tier + "/" + character.name + ".JPG");
            } catch {
                image = require("./img/Generic.JPG");
            }
            return (
                <Card key={character._id} className="p-2 m-2">
                    <Link to={`/Characters/View/${character.tier}/${character.name}`} className="characters-title">
                        <Card.Title className="text-center">{character.name}</Card.Title>
                        <Card.Img className="img-frame" variant="top" draggable="false" src={image} alt={character.name}/>
                    </Link>
                    <Card.Body>
                        <div className="text-center">
                            {tier}
                        </div>
                        <hr />
                        <div className="d-flex flex-column">
                            
                            <div >
                                {role}
                            </div>
                            <div >
                                {element}
                            </div>
                            <div >
                                {type}
                            </div>
                        </div>
                    </Card.Body>
                </Card>
            )    
        })
    ) : (<div></div>)
    return(
    <React.Fragment>
        <h1 className="text-center">Characters</h1>
        <hr className="shine" />
        {user ? user.access.toLowerCase() === "admin" ? <Row className="justify-content-center"><div></div><Link to="/Characters/Add" className="btn btn-outline-secondary">Add character</Link></Row> : null : null}
        <div className="d-flex justify-content-center">
            {characterList}
        </div>
        
    </React.Fragment>
    )
}
 
export default withRouter(Characters);