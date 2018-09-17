import React, { Component } from "react";
import { Container, Row, Col, Button } from 'reactstrap';
import logo from "./logo.svg";
import NavBarNoSession from "../../Components/NavBarNoSession"

class Home extends Component {
    
    render = () => {
        return (
            <div>
                <NavBarNoSession />
                <div className="App">
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h2>Welcome to project Papaya</h2>
                </div>
                </div>
                <Container>
                    <Row>
                        <h3>What we are</h3>
                    </Row>
                    <Row>
                        <h3>What is our goal</h3>
                    </Row>
                    <Row>
                        <h3>How does it work</h3>
                    </Row>
                    <Row>
                        <Button href="/LoginRegister">SIGN UP NOW</Button>
                    </Row>
                </Container>
            </div>
        )
    }
}

export default Home;