import React, { Component } from "react";
import "./LoginRegister.css";
import RegForm from "../../Components/RegForm";
import LoginForm from "../../Components/LoginForm";
import { Container, Row, Col } from 'reactstrap';
import NavBarNoSession from "../../Components/NavBarNoSession";

class LoginRegister extends Component {
    
    render = () => {
        return (
            <div>
            <NavBarNoSession />
                <div className="Heading">
                    <div className="Header">
                        <h2> Register & Login </h2>
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

export default LoginRegister;