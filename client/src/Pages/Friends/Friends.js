import React, {Component} from "react"; 
import "./Friends.css";
import API from '../../Utils/API.js'
import { Container, Row, Col } from 'reactstrap';
import SuggestedFriend from "../../Components/SuggestedFriend"; 
import NavBar from "../../Components/NavBar"; 


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
            <div>
            <NavBar />
                <div className="Heading">
                    <div className="Header">
                        <h2> Friends </h2>
                    </div>
                </div>
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
        </div>
        )
    }
}

export default Friends; 
