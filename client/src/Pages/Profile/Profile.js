import React, { Component }from "react";
import ProfileCard from "../../Components/ProfileCard";
import API from '../../Utils/API.js'
import { Container, Row, Col } from 'reactstrap';

class Profile extends Component {
    
    state = {
            user: ""
        
        };

    componentDidMount(){
        this.loadUser(); 
    }

    loadUser = () => {
        API.getUserData().then((result) => {
            //console.log("this is get user data result when loading profile page", result); 
            this.setState({user: result.data})
            console.log("this is state when profile is loaded ", this.state.user)
        })
    }

    render = () => {
        return (
            <Container>
                <Row>
                    <Col md="6"> 
                        <ProfileCard user={this.state.user}/>
                    </Col>
                    <Col md="6"> 
                        <p>My events</p>
                    </Col>
                </Row>
            </Container>

        )
    }
}

export default Profile;



