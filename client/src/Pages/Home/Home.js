import React, { Component } from "react";
import RegForm from "../../Components/RegForm"
import LoginForm from "../../Components/LoginForm"
import { Container, Row, Col } from 'reactstrap';
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
                        <Col md="6"> 
                        <RegForm />
                        </Col>
                        <Col md="6">
                        <LoginForm />
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

export default Home;