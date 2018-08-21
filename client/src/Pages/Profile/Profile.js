import React, { Component }from "react";
import "./Profile.css";
import ProfileCard from "../../Components/ProfileCard";
import EventCard from "../../Components/EventCard"; 
import API from '../../Utils/API.js'
import { Container, Row, Col } from 'reactstrap';
import { Nav, NavItem, NavLink } from 'reactstrap';

class Profile extends Component {
    
    state = {
            user: "", 
            myEvents: [], 
            attendingEvents: [], 
            whatToShow: "", 
        
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

    showComponent = (x) => {
        this.setState({whatToShow: x})
    }

    render = () => {
        return (
            <div>
                <div className="Heading">
                    <div className="Header">
                        <h2> Profile </h2>
                    </div>
                </div>
                <Container>
                    <Row>
                        <Col md="9">
                            
                                {this.state.whatToShow === "myEvents" ? this.state.myEvents.map(events => {
                                    
                                    return (
                                    <div>
                                        <hr />
                                            <p> Hosting </p>
                                                <EventCard
                                                key={events.id}
                                                name={events.eventName}
                                                details={events.eventDetails}
                                                date={events.eventDate}
                                                location={events.eventLocation}
                                                maxPpl={events.eventMaxppl}
                                                eventId={events.id}
                                                participants={events.participants}
                                                /> 
                                        <hr /> 
                                     </div> )
                                }) : null }
                           
                                {this.state.whatToShow === "attendingEvents" ? this.state.attendingEvents.map(attending => {
                                        return(
                                            <div>
                                                <hr />
                                                    <p> Attending </p>
                                                        <EventCard
                                                        key={attending.id}
                                                        name={attending.eventName}
                                                        details={attending.eventDetails}
                                                        date={attending.eventDate}
                                                        location={attending.eventLocation}
                                                        maxPpl={attending.eventMaxppl}
                                                        eventId={attending.id}
                                                        participants={attending.participants}
                                                        />
                                                <hr />
                                            </div>
                                        )
                                    }) : null}
                                {this.state.whatToShow === "profile" ? <h3> profile info here </h3> : null }
                        </Col>
                        <Col md="3">
                            <ProfileCard 
                            firstName={this.state.user.firstName}
                            lastName={this.state.user.lastName}/>

                            <hr />
                                 <Nav vertical>
                                    <NavItem>
                                        <NavLink onClick={() => this.showComponent("myEvents")} >My events</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink onClick={() => this.showComponent("attendingEvents")} >Attending</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink onClick={() => this.showComponent("profile")}>Profile</NavLink>
                                    </NavItem>
                                </Nav>
                            <hr />
                        </Col>
                    </Row>
                </Container>
            </div>

        )
    }
}

export default Profile;
