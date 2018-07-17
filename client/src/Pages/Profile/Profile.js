import React, { Component }from "react";
import ProfileCard from "../../Components/ProfileCard";
import EventCard from "../../Components/EventCard"; 
import API from '../../Utils/API.js'
import { Container, Row, Col } from 'reactstrap';

class Profile extends Component {
    
    state = {
            user: "", 
            myEvents: [], 
            attendingEvents: []
        
        };

    componentDidMount(){
        this.loadUser(); 
    }

    loadUser = () => {
        API.getUserData().then((result) => {
            this.setState({user: result.data, 
                myEvents: result.data.myEvents, 
                attendingEvents: result.data.attendingEvents
            })
        })
    }

    render = () => {
        return (
            <Container>
                <Row>
                    <Col md="6"> 
                        <ProfileCard firstName={this.state.user.firstName}
                        lastName={this.state.user.lastName}/>
                    </Col>
                    <Col md="6"> 
                        <p> Hosting </p>
                        {this.state.myEvents.map(events => {
                            return (
                                <EventCard
                                key={events.id}
                                name={events.eventName}
                                details={events.eventDetails}
                                date={events.eventDate}
                                location={events.eventLocation}
                                maxPpl={events.eventMaxppl}
                                eventId={events.id}
                                /> 
                            )
                        })}
                    </Col>
                </Row>
                <Row>
                    <Col md ="6">
                        <p> My Friends </p>
                    </Col>
                    <Col md ="6">
                        <p> Attending </p>
                            {this.state.attendingEvents.map(attending => {
                                return(
                                    <EventCard
                                    key={attending.id}
                                    name={attending.eventName}
                                    details={attending.eventDetails}
                                    date={attending.eventDate}
                                    location={attending.eventLocation}
                                    maxPpl={attending.eventMaxppl}
                                    eventId={attending.id}
                                    />
                                )
                            })}
                    </Col>
                </Row>    

            </Container>

        )
    }
}

export default Profile;



