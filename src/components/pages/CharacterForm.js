import React from 'react';
import { withRouter } from 'react-router-dom';
import { Card, Accordion, Button, Container, Col, Row, ListGroup, Form, InputGroup } from 'react-bootstrap';

// characters: [{
//     _id: 1,
//     name: "Garff",
//     role: "Paladin",
//     sex: "Male",
//     nation: "Saint West",
//     tier: "Fated",
//     element: "Light",
//     age: "55",
//     race: "Dwarf",
//     position: "Defense",
//     type: "Physical",
//     title: "",
//     description: "The first of the Five Greatest Generals of Saint West. While Garff was born a commoner, he was always interested in war and dreamed of becoming a general. To realize his dream, Garff studied strategies and writings of great commanders.\n\nWhen he was old enough, Garff joined the army. He earned respect through self-management and Outstanding abilities, despite his humble background. Valarr, who had taken an interest in Garff, recommended him for the knighthood.\n \nThough Garff became a knight at a relatively late age, he was able to rise to the rank of general in a short time after defeating Valarr in a jousting competition and gaining the favor of the King. After becoming a general, Garff made a name for himself from his contributions in the war against Bronn and became the First of the Five Greatest Generals.\n \nHowever, the King was killed in a revolt led by Carrie and the capital fell into the rebels. Now Garff is avoiding Valarr's pursuit and gathering forces in preparation for Rachel's return.",
//     skills: {
//         passive: { name: "Protect 3", description: ["Grants Share Health to ally with the lowest maximum Health and heals their Health by 30% of the caster's current Health at the beginning of the round\nGain Mana(1 mana) if Health of the target is less than 20%\nGain(1 mana) if Health of target is more than 70%", "[Breath of Mana]\n[Over Time Effect] Front row allies permanently gain 1 mana", "[Command]\nGrants allies with lower maximum Health than self with the Comman mark and increases Defense/Health by 20%"]},
//         active1: { name: "Eagle Blow", cost: 2, description: ["[Single] Deals 375% damage to 1 enemy"]},
//         active2: { name: "General's Call", cost: 5, description: ["[Back Row First] Deals 420% damage to all back row enemies"]}
//     },
//     maxStats: [{
//         level: 100,
//         power: 282000,
//         HP: 6816,
//         attack: 809,
//         minAttack: 742,
//         maxAttack: 877,
//         defense: 1540,
//         hit: 100,
//         dodge: 99,
//         criticalHit: 120,
//         block: 210,
//         attackSpeed: 56,
//         criticalDamage: 150,
//         blockDefenceRate: 50,
//         luck: 0
//     }],
//     recommendations: [],
// },

const CharacterForm = (props) => {
    const [character, setCharacter] = React.useState(props.character ? 
        props.character : {
                    _id: null,
                    name: null,
                    role: null,
                    sex: null,
                    nation: null,
                    tier: null,
                    element: null,
                    age: null,
                    race: null,
                    position: null,
                    type: null,
                    title: null,
                    description: null,
                    skills: {
                        passive: { name: null, description: []},
                        active1: { name: null, cost: null, description: []},
                        active2: { name: null, cost: null, description: []}
                    },
                    maxStats: [{
                        level: null,
                        power: null,
                        HP: null,
                        attack: null,
                        defense: null,
                        hit: null,
                        dodge: null,
                        criticalHit: null,
                        block: null,
                        attackSpeed: null,
                        criticalDamage: null,
                        blockDefenceRate: null,
                        luck: null
                    }],
                    recommendations: [],
                })

    const manageSkills = (e) => {
      if(e.target.name === "passiveName"){
        const passive = {...character.skills.passive, name: document.getElementById("PassiveName").value}
        const skills = {...character.skills, passive}
        setCharacter({...character, skills})
      }
      else if(e.target.name === "passiveDescription"){
        const passive = {...character.skills.passive, description: [...character.skills.passive.description, document.getElementById("PassiveDescription").value]}
        const skills = {...character.skills, passive}
        setCharacter({...character, skills})
      }
      else if(e.target.name === "passivePop"){
        const passive = {...character.skills.passive, description: [...character.skills.passive.description].filter(desc=>desc!==[...character.skills.passive.description].pop())}
        const skills = {...character.skills, passive}
        setCharacter({...character, skills})
      }
      else if(e.target.name ==="active1Name"){
        const active1 = {...character.skills.active1, name: document.getElementById("Active1Name").value}
        const skills = {...character.skills, active1}
        setCharacter({...character, skills})
      }
      else if(e.target.name==="active1Cost"){
        const active1 = {...character.skills.active1, cost: document.getElementById("Active1Cost").value}
        const skills = {...character.skills, active1}
        setCharacter({...character, skills})
      }
      else if(e.target.name === "active1Description"){
        const active1 = {...character.skills.active1, description: [...character.skills.active1.description, document.getElementById("Active1Description").value]}
        const skills = {...character.skills, active1}
        setCharacter({...character, skills})
      }
      else if(e.target.name === "active1pop"){
        const active1 = {...character.skills.active1, description: [...character.skills.active1.description].filter(desc=>desc!==[...character.skills.active1.description].pop())}
        const skills = {...character.skills, active1}
        setCharacter({...character, skills})
      }
      else if(e.target.name ==="active2Name"){
        const active2 = {...character.skills.active2, name: document.getElementById("Active2Name").value}
        const skills = {...character.skills, active2}
        setCharacter({...character, skills})
      }
      else if(e.target.name==="active2Cost"){
        const active2 = {...character.skills.active2, cost: document.getElementById("Active2Cost").value}
        const skills = {...character.skills, active2}
        setCharacter({...character, skills})
      }
      else if(e.target.name === "active2Description"){
        const active2 = {...character.skills.active2, description: [...character.skills.active2.description, document.getElementById("Active2Description").value]}
        const skills = {...character.skills, active2}
        setCharacter({...character, skills})
      }
      else if(e.target.name === "active2pop"){
        const active2 = {...character.skills.active2, description: [...character.skills.active2.description].filter(desc=>desc!==[...character.skills.active2.description].pop())}
        const skills = {...character.skills, active2}
        setCharacter({...character, skills})
      }
    }
        
    const backOnClick = () => {
      console.log(character)
      //this.props.history.goBack();
    }
    return ( 
    <>
        <Container className="mt-4">
          <Row className="flex-row-reverse">
                <div></div><Button className="mr-4 mb-3" size="lg" variant="outline-secondary" onClick={backOnClick}>Back</Button>
              </Row>
              <Row>
                <Col sm={3} style={{}}>
                  <h2 className="text-center">{character.name}</h2>
                  <InputGroup>
                    <Form.Control defaultValue={character.name} id="Name" placeholder="Name"/>
                    <InputGroup.Append><Button variant="outline-secondary" onClick={()=>setCharacter({...character, name: document.getElementById("Name").value})}>Set</Button></InputGroup.Append>
                  </InputGroup>
                  <Form.Control as="select" 
                    value={character.element ? character.element : "-----"}
                    onChange={e=>setCharacter({...character, element: e.target.value})}>
                    <option value="-----" disabled>-----</option>
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                    <option value="fire">Fire</option>
                    <option value="ice">Ice</option>
                    <option value="nature">Nature</option>
                    <option value="machine">Machine</option>
                  </Form.Control>
                  <div className="text-center">
                    <img className="force-center m-2 img-frame" src={require("../../img/Generic.JPG")} alt={`${character.name}`}/>
                  </div>
                </Col>
                <Col>
                
                <Row>
                  <Accordion defaultActiveKey="0" style={{"width": "100%"}}>
                  <Card>
                    <Card.Header>
                      <Accordion.Toggle as={Button} variant="link" eventKey="0">
                        Skills
                      </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="0">
                      <Card.Body>
                        <ListGroup variant="flush">
                          <ListGroup.Item>
                            <div className="pre-wrap-me"><b>[Passive] {character.skills.passive.name}</b></div>
                            {character.skills.passive.description.map((skill, no) => {
                              return <div className="pre-wrap-me" key={no}>
                                {skill + "\n\n"}
                                </div>
                            })}
                            <Button className="mt-1" size="sm" variant="outline-danger" name="passivePop" onClick={(e)=>manageSkills(e)}>Delete</Button>
                            <InputGroup className="mt-1">
                              <Form.Control defaultValue={character.skills.passive.name} id="PassiveName" placeholder="Passive Name"/>
                              <InputGroup.Append>
                                <Button variant="outline-secondary" name="passiveName" onClick={(e)=>manageSkills(e)}>Set</Button>
                              </InputGroup.Append>
                            </InputGroup>
                            <InputGroup className="mt-1">
                              <Form.Control className="overflow-hidden" id="PassiveDescription" placeholder="Passive Description" as="textarea" rows="3"/>
                              <InputGroup.Append><Button variant="outline-secondary" name="passiveDescription" onClick={(e)=>manageSkills(e)}>Add</Button></InputGroup.Append>
                            </InputGroup>
                          </ListGroup.Item>
                          <ListGroup.Item>
                            <div className="pre-wrap-me"><b>[Active 1] {character.skills.active1.name} - Cost: {character.skills.active1.cost}</b></div>
                            {character.skills.active1.description.map((skill, no) => {
                              return <div className="pre-wrap-me" key={no}>{skill + "\n\n"}</div>
                            })}
                            <Button className="mt-1" size="sm" variant="outline-danger" name="active1pop" onClick={(e)=>manageSkills(e)}>Delete</Button>
                            <InputGroup className="mt-1">
                              <Form.Control defaultValue={character.skills.active1.name} id="Active1Name" placeholder="Active 1 Name"/>
                              <InputGroup.Append>
                                <Button variant="outline-secondary" name="active1Name" onClick={(e)=>manageSkills(e)}>Set</Button>
                              </InputGroup.Append>
                            </InputGroup>
                            <InputGroup>
                              <Form.Control defaultValue={character.skills.active1.cost} id="Active1Cost" placeholder="Mana Cost"/>
                              <InputGroup.Append>
                                <Button variant="outline-secondary" name="active1Cost" onClick={(e)=>manageSkills(e)}>Set</Button>
                              </InputGroup.Append>
                            </InputGroup>
                            
                            <InputGroup className="mt-1">
                              <Form.Control className="overflow-hidden" id="Active1Description" placeholder="Active 1 Description" as="textarea" rows="3"/>
                              <InputGroup.Append><Button variant="outline-secondary" name="active1Description" onClick={(e)=>manageSkills(e)}>Add</Button></InputGroup.Append>
                            </InputGroup>
                          </ListGroup.Item>
                          <ListGroup.Item>
                            <div className="pre-wrap-me"><b>[Active 2] {character.skills.active2.name} - Cost: {character.skills.active2.cost}</b></div>
                            {character.skills.active2.description.map((skill, no) => {
                              return <div className="pre-wrap-me" key={no}>{skill + "\n\n"}</div>
                            })}
                            <Button className="mt-1" size="sm" variant="outline-danger" name="active2pop" onClick={(e)=>manageSkills(e)}>Delete</Button>
                            <InputGroup className="mt-1">
                              <Form.Control defaultValue={character.skills.active2.name} id="Active2Name" placeholder="Active 2 Name"/>
                              <InputGroup.Append>
                                <Button variant="outline-secondary" name="active2Name" onClick={(e)=>manageSkills(e)}>Set</Button>
                              </InputGroup.Append>
                            </InputGroup>
                            <InputGroup>
                              <Form.Control defaultValue={character.skills.active2.cost} id="Active2Cost" placeholder="Mana Cost"/>
                              <InputGroup.Append>
                                <Button variant="outline-secondary" name="active2Cost" onClick={(e)=>manageSkills(e)}>Set</Button>
                              </InputGroup.Append>
                            </InputGroup>
                            
                            <InputGroup className="mt-1">
                              <Form.Control className="overflow-hidden" id="Active2Description" placeholder="Active 2 Description" as="textarea" rows="3"/>
                              <InputGroup.Append>
                                <Button variant="outline-secondary" name="active2Description" onClick={(e)=>manageSkills(e)}>Add</Button>
                              </InputGroup.Append>
                            </InputGroup>
                          </ListGroup.Item>
                        </ListGroup>
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>
                  <Card>
                    <Card.Header>
                      <Accordion.Toggle as={Button} variant="link" eventKey="1">
                        Backstory
                      </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="1">
                      <Card.Body className="pre-wrap-me">
                        <div>{character.description}</div>
                        <InputGroup className="mt-3">
                        <Form.Control className="overflow-hidden" id="backstory" placeholder="Enter the backstory..." as="textarea" rows="3"/>
                        <InputGroup.Append>
                          <Button variant="outline-secondary" onClick={()=>setCharacter({...character, description: document.getElementById("backstory").value})}>Add</Button>
                        </InputGroup.Append>
                      </InputGroup>
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>
                  <Card>
                    <Card.Header>
                      <Accordion.Toggle as={Button} variant="link" eventKey="2">
                        Other info
                      </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="2">
                      <Card.Body className="text-center">
                        {/*
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
                        */}
                        <Row>
                          <Col md={6}>Role: <Form.Control className="inline-form" onChange={e=>setCharacter({...character, role: e.target.value})} /></Col>
                          <Col md={6}>Sex: <Form.Control className="inline-form" onChange={e=>setCharacter({...character, sex: e.target.value})} /></Col>
                        </Row>
                        <Row>
                          <Col md={6}>Nation: <Form.Control className="inline-form" onChange={e=>setCharacter({...character, nation: e.target.value})} /></Col>
                          <Col md={6}>Age: <Form.Control className="inline-form" onChange={e=>setCharacter({...character, age: e.target.value})} /></Col>
                        </Row>
                        <Row>
                          <Col md={6}>Race: <Form.Control className="inline-form" onChange={e=>setCharacter({...character, race: e.target.value})} /></Col>
                          <Col md={6}>Position: <Form.Control className="inline-form" onChange={e=>setCharacter({...character, position: e.target.value})} /></Col>
                        </Row>
                        <Row>
                          <Col md>Type: <Form.Control className="inline-form" onChange={e=>setCharacter({...character, type: e.target.value})} /></Col>
                          <Col md>Title: <Form.Control className="inline-form" onChange={e=>setCharacter({...character, title: e.target.value})} /></Col>
                        </Row>
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>
                  <Card>
                    <Card.Header>
                      <Accordion.Toggle as={Button} variant="link" eventKey="4">
                        Stats
                      </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="4">
                      <Card.Body>
                        {/* maxStats: [{
                              level: 100,
                              power: 282000,
                              HP: 6816,
                              attack: 809,
                              minAttack: 742,
                              maxAttack: 877,
                              defense: 1540,
                              hit: 100,
                              dodge: 99,
                              criticalHit: 120,
                              block: 210,
                              attackSpeed: 56,
                              criticalDamage: 150,
                              blockDefenceRate: 50,
                              luck: 0
                            }]*/}
                            <ListGroup>
                              {character.maxStats.map((stats, count) => {
                                return (
                                <ListGroup.Item key={count}>
                                  <h5>Level: {stats.level}</h5>
                                  <hr />
                                  <Row>
                                    <Col md={6}>Power: &nbsp;&nbsp;&nbsp;&nbsp;{stats.power}</Col>
                                    <Col md={6}>HP: &nbsp;&nbsp;&nbsp;&nbsp;{stats.HP}</Col>
                                  </Row>
                                  <Row>
                                    <Col md={6}>Attack: &nbsp;&nbsp;&nbsp;&nbsp;{stats.attack}</Col>
                                    <Col md={6}>Defense: &nbsp;&nbsp;&nbsp;&nbsp;{stats.defense}</Col>
                                  </Row>
                                  <Row>
                                    <Col md={6}>Hit: &nbsp;&nbsp;&nbsp;&nbsp;{stats.hit}</Col>
                                    <Col md={6}>Dodge: &nbsp;&nbsp;&nbsp;&nbsp;{stats.dodge}</Col>
                                  </Row>
                                  <Row>
                                    <Col md={6}>Critical Hit: &nbsp;&nbsp;&nbsp;&nbsp;{stats.criticalHit}</Col>
                                    <Col md={6}>Block: &nbsp;&nbsp;&nbsp;&nbsp;{stats.block}</Col>
                                  </Row>
                                  <Row>
                                    <Col md={6}>Attack Speed: &nbsp;&nbsp;&nbsp;&nbsp;{stats.attackSpeed}</Col>
                                    <Col md={6}>Critical Damage: &nbsp;&nbsp;&nbsp;&nbsp;{stats.criticalDamage}</Col>
                                  </Row>
                                  <Row>
                                    <Col md={6}>Block Defense Rate: &nbsp;&nbsp;&nbsp;&nbsp;{stats.blockDefenceRate}</Col>
                                    <Col md={6}>Luck: &nbsp;&nbsp;&nbsp;&nbsp;{stats.luck}</Col>
                                  </Row>
                                </ListGroup.Item>
                                )
                              })}
                            </ListGroup>
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>
                </Accordion>
                </Row>
                </Col>
              </Row>
        </Container>
    </> 
    );
}
 
export default withRouter(CharacterForm);