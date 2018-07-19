import React, {Component} from "react"; 
import API from '../../Utils/API.js'
import { Container, Row, Col } from 'reactstrap';
import SuggestedFriend from "../../Components/SuggestedFriend"; 


class Friends extends Component {

    state = {
        stalking: [],
        suggestedFriend: []

    }

    componentDidMount(){
      this.loadUser();
      this.suggestedFriend(); 
    }

    loadUser = () => {
        API.getUserData().then((result) => {
            this.setState({stalking: result.data.following 
            })
        })
    }

    suggestedFriend = () => {
        API.suggestedFriend().then((result) => {
            console.log("this is suggested friend", result.data);
            this.setState({suggestedFriend: result.data})
        })
    }

    follow = (data) => {
        var personToFollow = {id: data}
        API.follow(personToFollow).then((result) => {
            var newSuggested = this.state.suggestedFriend.filter(function(user) { 
                return user._id != personToFollow.id 
            });  
            this.setState({stalking: result.data.following, 
                suggestedFriend: newSuggested});
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
