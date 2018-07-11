import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import RegForm from "./Components/RegForm"
import LoginForm from "./Components/LoginForm"
import { Container, Row, Col } from 'reactstrap';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom"
import Profile from "./Pages/Profile";


class App extends Component {
  render() {
    return (
      <div>
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to socialize</h2>
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
      
      <Router>
        <Switch>
        <Route exact path="/profile" render={() => (true === true ? <Profile/> : <Profile/>)} />
        </Switch>
      </Router>  
  
      </div>
    );
  }
}

export default App;
