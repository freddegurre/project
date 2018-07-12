import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom"
import Profile from "./Pages/Profile";
import Home from "./Pages/Home";
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
          console.log("this is res.data when check session" , res.data); 
          console.log("this is state ", this.state)
          if (res.data.auth === true){
          this.setState({session: true, 
            })
          
          }
        })
      };

  render() {
    return (
    
      <div>
      <Router>
        <Switch>
        <Route exact path="/" render={() => (this.state.session === true ? <Profile/> : <Home/>)} />
        <Route exact path="/profile" render={() => (this.state.session === true ? <Profile/> : <Home/>)} />
        </Switch>
      </Router>  
  
      </div>
    );
  }
}

export default App;
