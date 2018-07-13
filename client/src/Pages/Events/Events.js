import React, {Component} from "react"; 
//import API from '../../Utils/API.js'
import { Container, Row, Col } from 'reactstrap';
import EventModal from "../../Components/EventModal"

class Events extends Component {

    sate = {

    }

    render = () => {
        return (
            <Container>
            <p> This is event Page </p>
            <EventModal />
            </Container>
        )
    }
}

export default Events; 