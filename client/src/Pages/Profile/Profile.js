import React, { Component }from "react";
import ProfileCard from "../../Components/ProfileCard";
import EventCard from "../../Components/EventCard"; 
import API from '../../Utils/API.js'
import { Container, Row, Col } from 'reactstrap';

class Profile extends Component {
    
    state = {
            user: "", 
            myEvents: []
        
        };

    componentDidMount(){
        this.loadUser(); 
    }

    loadUser = () => {
        API.getUserData().then((result) => {
            console.log(result.data); 
            this.setState({user: result.data, myEvents: result.data.myEvents})
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
            </Container>

        )
    }
}

export default Profile;



