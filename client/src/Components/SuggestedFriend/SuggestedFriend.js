import React from "react";
import "./SuggestedFriend.css";
import { Card, Button, CardHeader, CardBody,
    CardTitle, CardText } from 'reactstrap';

const SuggestedFriend = (props) => {
    return (
        <div>
            <Card>
                <CardHeader>{props.firstName}</CardHeader>
                <CardBody>
                    <CardTitle> {props.firstName} </CardTitle>
                    <CardText>{props.lastName}</CardText>
                    <Button onClick={props.follow}>Follow</Button>
                </CardBody>
            </Card>
        </div>
    )
}

export default SuggestedFriend;