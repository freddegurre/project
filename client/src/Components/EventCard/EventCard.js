import React from "react";
import "./EventCard.css";
import { Card, Button, CardHeader, CardBody,
    CardText } from 'reactstrap';
import { Row, Col } from 'reactstrap';

const EventCard = (props) => {
    return (
        <div>
            <Card id={props.eventId}>
                <CardHeader>{props.name}</CardHeader>
                <CardBody>
                    <Row>
                        <Col md="6"> 
                            <CardText>{props.details}</CardText>
                            <CardText>{props.date}</CardText>
                            <CardText>{props.location}</CardText>
                            <CardText>{props.maxPpl}</CardText>
                            <Button onClick={props.join}> Join</Button>
                        </Col>
                        <Col md="6">
                                <p> Participants </p>
                                {props.participants.map(participant =>{
                                    return(
                                        <p>{participant.firstName} </p>
                                    )
                                    
                                })}
                        </Col>
                    </Row>
                </CardBody>
            </Card>
        </div>
    )
}

export default EventCard;