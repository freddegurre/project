import React, {Component} from "react"; 
import API from '../../Utils/API.js'
import { Container, Row, Col } from 'reactstrap';
import SuggestedFriend from "../../Components/SuggestedFriend"; 


class Friends extends Component {

    state = {
        suggestedFriend: [], 
        following: []
    }

    componentDidMount(){
        this.suggestedFriend(); 
    }

    suggestedFriend = () => {
        API.suggestedFriend().then((result) => {
            console.log("This should be users exept me",result.data)
            this.setState({suggestedFriend: result.data})
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
                        {this.state.suggestedFriend.map(suggested =>{
                        return (
                            <SuggestedFriend 
                            firstName={suggested.firstName}
                            lastName={suggested.lastName}
                            />
                        )
                    })}   
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default Friends; 
