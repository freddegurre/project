import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import RegForm from "./Components/RegForm"

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
      <RegForm />
      </div>
    );
  }
}

export default App;
