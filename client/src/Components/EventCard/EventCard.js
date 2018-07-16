import React from "react";
import "./EventCard.css";
import { Card, Button, CardHeader, CardBody,
    CardTitle, CardText } from 'reactstrap';

const EventCard = (props) => {

  
    return (
        <div>
            <Card id={props.eventId}>
                <CardHeader>{props.name}</CardHeader>
                <CardBody>
                    <CardText>{props.details}</CardText>
                    <CardText>{props.date}</CardText>
                    <CardText>{props.location}</CardText>
                    <CardText>{props.maxPpl}</CardText>
                    <Button onClick={props.join}> Join</Button>
                </CardBody>
            </Card>
        </div>
    )
}

export default EventCard;