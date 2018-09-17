import React, { Component } from "react";
import { Container, Row, Col, Button } from 'reactstrap';
import logo from "./logo.svg";

class Home extends Component {
    
    render = () => {
        return (
            <div>
                <div className="App">
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h2>Welcome to project</h2>
                </div>
                </div>
                <Container>
                    <Row>
                     <Button href="/LoginRegister">Sign UP!</Button>
                    </Row>
                </Container>
            </div>
        )
    }
}

export default Home;