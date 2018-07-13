import React, {Component} from "react"; 
import API from '../../Utils/API.js'
import { Container, Row, Col } from 'reactstrap';
import EventModal from "../../Components/EventModal"
import EventCard from "../../Components/EventCard"; 


class Events extends Component {

    state = {
        events: []
    }

    componentDidMount(){
        this.allEvents(); 
    }

    allEvents = () => {
        API.allEvents().then((result) => {
            console.log(result); 
            this.setState({events: result.data})
        })
    }

    render = () => {
        return (
            <Container>
                <Row>
                    <Col md="2"> 
                        <EventModal />
                    </Col>
                    <Col md="10">
                    {this.state.events.map(events =>{
                        return (
                            <EventCard 
                            key={events._id}
                            name={events.eventName}
                            details={events.eventDetails}
                            date={events.eventDate}
                            location={events.eventLocation}
                            maxPpl={events.eventMaxppl}
                            eventId={events._id}
                            />
                        )
                    })}    
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default Events; 
