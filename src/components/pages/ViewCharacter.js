import React, { Component } from 'react';
import {withRouter} from 'react-router-dom'
import { Card, Nav, Container } from 'react-bootstrap';

class ViewCharacter extends Component {
    componentDidMount(){
        console.log(this.props)
        let name = this.props.match.params.name;
        this.setState({name})
    }

    state = { 
        name: null,
        isNotAdmin: true,
        character: {}
    }

    switch = (e) => {
        console.log(e)
    }

    displaySwitch = () => {

    }

    displayCharacter = () => {
        const isNotAdmin = this.state.isNotAdmin;
        const character = this.props.character;
        return(
            <Container>
                <Card>
                  <Card.Header>
                    <Nav variant="tabs" defaultActiveKey="#profile" className="justify-content-end">
                      <Nav.Item>
                        <Nav.Link href="#profile" name="profile" onClick={(e) => this.switch(e.target.name)}>Profile</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link href="#stats" name="stats" onClick={e => this.switch(e.target.name)}>Stats</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link href="#modify" disabled={isNotAdmin}>
                          Modify
                        </Nav.Link>
                      </Nav.Item>
                    </Nav>
                  </Card.Header>
                  <div className="p-4">
                    <img className="f-l m-2 img-frame" src={require("../../img/" + character.tier + "/" + character.name + ".JPG")} alt={`${character.name}`}/>
                    <Card.Title className="p-4 text-center">{character.name}</Card.Title>
                    <div className="container">
                        <div className="row">
                            <div className="col">Element :</div>
                            <div className="col">{character.element}</div>
                        </div>
                    </div>
                  </div>
                </Card>
            </Container>
        )
    }

    render() { 
        const selectedCharacter = this.state.name ? (<this.displayCharacter />) : (<div>loading...</div>);
        return ( 
        <div>
            { this.state.id }
            {selectedCharacter}
        </div>
        );
    }
}
 
export default withRouter(ViewCharacter);