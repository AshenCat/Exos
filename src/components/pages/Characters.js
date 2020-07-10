import React from 'react';
import {withRouter, Link} from 'react-router-dom';
import {Card, Row} from 'react-bootstrap';
import { UserContext } from '../../App';

const Characters = (props) => {
    //console.log(props) //withRouter
    
    const user = React.useContext(UserContext);
    const {characters} = props;
    // console.log(user)
    const characterList = characters.length ? (
        characters.map(character => {
            return (
                <Card key={character._id} className="p-2 m-2">
                    <Link to={`/Characters/View/${character.name}`} className="characters-title">
                        <Card.Title className="text-center">{character.name}</Card.Title>
                        <Card.Img className="img-frame" variant="top" draggable="false" src={require("../../img/" + character.tier + "/" + character.name + ".JPG")} alt={character.name}/>
                    </Link>
                    <Card.Body>
                        <div className="text-center">
                            {character.tier}
                        </div>
                        <hr />
                        <div className="d-flex flex-column">
                            
                            <div >
                                {character.role}
                            </div>
                            <div >
                                {character.element}
                            </div>
                            <div >
                                {character.type}
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