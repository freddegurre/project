import React, {Component} from "react"; 
import API from '../../Utils/API.js'
import { Container, Row, Col } from 'reactstrap';
import SuggestedFriend from "../../Components/SuggestedFriend"; 


class Friends extends Component {

    state = {
        suggestedFriend: [], 
        stalking: []
    }

    componentDidMount(){
        this.suggestedFriend();
        this.following() 
    }

    suggestedFriend = () => {
        API.suggestedFriend().then((result) => {
            console.log("This should be users exept me",result.data)
            this.setState({suggestedFriend: result.data})
        })
    }

    following = () => {
        API.following().then((results) => {
            console.log("this is follwoing", results);
             this.setState({stalking: results.data}); 
        })
    }

    follow = (data) => {
        var personToFollow = {id: data}
        API.follow(personToFollow).then((result) => {
            
        })
    }


    render = () => {
        return (
            <Container>
                <Row>
                    <Col md="6"> 
                        <p>Following</p>
                        {this.state.stalking.map(myFriend =>{
                            return (
                                <SuggestedFriend
                                firstName={myFriend.firstName}
                                lastName={myFriend.lastName}
                                />
                            )
                        })}
                        
                    </Col>
                    <Col md="6">
                        <p>Suggestions</p>
                        {this.state.suggestedFriend.map(suggested =>{
                        return (
                            <SuggestedFriend 
                            firstName={suggested.firstName}
                            lastName={suggested.lastName}
                            follow={() => this.follow(suggested._id)}
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
