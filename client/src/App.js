import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom"
import IndexPage from "./Pages/IndexPage";
import LoginRegister from "./Pages/LoginRegister";
import Home from "./Pages/Home"; 
import Profile from "./Pages/Profile";
import Events from "./Pages/Events"
import Friends from "./Pages/Friends"
import API from "./Utils/API"


class App extends Component {

      state = {
        session: false
      };

      componentDidMount(){
        this.isLoggedIn(); 
      }

      isLoggedIn = () => {
        API.checkIfsession().then(res =>{
          if (res.data.auth === true){
              this.setState({session: true})
          
          }
        })
      };

  render() {
    return (
    
      <div> 
      <Router>
        <Switch>
        <Route exact path="/" render={() => (this.state.session === true ? <Profile/> : <IndexPage/>)} />
        <Route exact path="/LoginRegister" render={() => (this.state.session === true ? <Profile/> : <LoginRegister/>)} />
        <Route exact path="/home" render={() => (this.state.session === true ? <Home/> : <IndexPage/>)} />
        <Route exact path="/profile" render={() => (this.state.session === true ? <Profile/> : <IndexPage/>)} />
        <Route exact path="/events" render={() => (this.state.session === true ? <Events/> : <IndexPage/>)} />
        <Route exact path="/friends" render={() => (this.state.session === true ? <Friends/> : <IndexPage/>)} />
        </Switch>
      </Router>  
  
      </div>
    );
  }
}

export default App;
