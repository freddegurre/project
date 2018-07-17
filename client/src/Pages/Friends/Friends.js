import React, {Component} from "react"; 
import API from '../../Utils/API.js'
import { Container, Row, Col } from 'reactstrap';


class Friends extends Component {

    state = {
        events: []
    }

    componentDidMount(){
    }

    allEvents = () => {
        API.allEvents().then((result) => {
            console.log(result); 
            this.setState({events: result.data})
        })
    }

    joinEvent = (data) => {
        var joiningEvent = {eventID : data}
        API.joinEvent(joiningEvent).then((result) => {
           this.allEvents(); 

        })
    }

    render = () => {
        return (
            <Container>
                <Row>
                    <Col md="6"> 
                        <p>Following</p>
                    </Col>
                    <Col md="6">
                        <p>Suggestions</p> 
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default Friends; 
