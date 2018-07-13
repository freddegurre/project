import React from "react";
import "./ProfileCard.css";
import { Card, Button, CardHeader, CardBody,
    CardTitle, CardText } from 'reactstrap';

const ProfileCard = (props) => {
    return (
        <div>
            <Card>
                <CardHeader>Profile</CardHeader>
                <CardBody>
                    <CardTitle> {props.firstName} </CardTitle>
                    <CardText>{props.lastName}</CardText>
                    <Button>Edit</Button>
                </CardBody>
            </Card>
        </div>
    )
}

export default ProfileCard;