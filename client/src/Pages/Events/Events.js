import React, {Component} from "react"; 
import API from '../../Utils/API.js'
import "./Events.css";
import { Container, Row, Col } from 'reactstrap';
import EventModal from "../../Components/EventModal"
import EventCard from "../../Components/EventCard";
import { Nav, NavItem, NavLink } from 'reactstrap';
import MyCal from "../../Components/Calendar";


class Events extends Component {

    state = {
        events: []
    }

    componentDidMount(){
        this.allEvents(); 
    }

    allEvents = () => {
        API.allEvents().then((result) => {
            console.log("this is all events", result.data); 
            this.setState({events: result.data})
        })
    }

    joinEvent = (data) => {
        var joiningEvent = {eventID : data}
        API.joinEvent(joiningEvent).then((result) => {
            var newEventsArr = this.state.events.filter(function(event){
                return event._id != joiningEvent.eventID
            }); 
            this.setState({events: newEventsArr}); 

        })
    }

    render = () => {
        return (
            <div>
                <div className="Heading">
                    <div className="Header">
                        <h2> Find Event </h2>
                    </div>
                </div>
                <Container>
                    <Row>
                        <Col md="9"> 
                           {this.state.events.map(events =>{
                            return (
                                
                                <EventCard 
                                key={events._id}
                                name={events.eventName}
                                details={events.eventDetails}
                                date={events.eventDate}
                                location={events.eventLocation}
                                maxPpl={events.eventMaxppl}
                                eventid={events._id}
                                participants={events.participants}
                                join={() => this.joinEvent(events._id)}
                                />
                            )
                        })}   
                        </Col>
                        <Col md="3"> 
                        <EventModal />
                        <div>
                            <hr />
                                <Nav vertical>
                                    <NavItem>
                                        <NavLink href="#">Filter</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink href="#">Filter</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink href="#">Filter</NavLink>
                                    </NavItem>
                                </Nav>
                            <hr />
                        </div>
                        <MyCal />
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

export default Events; 
