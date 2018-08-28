import React, { Component } from "react";
import "./RegForm.css";
import API from "../../Utils/API.js"
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

function Redirect(where) {
  window.location = where;
}

class RegForm extends Component {
  // Setting the component's initial state
  state = {
    firstName: "",
    lastName: "",
    password: ""
  };

  handleInputChange = event => {
    // Getting the value and name of the input which triggered the change
    let value = event.target.value;
    const name = event.target.name;

    if (name === "password") {
      value = value.substring(0, 15);
    }
    // Updating the input's state
    this.setState({
      [name]: value
    });
  };
 
  handleFormSubmit = event => {
    // Preventing the default behavior of the form submit (which is to refresh the page)
    event.preventDefault();
    console.log(" this is state ", this.state)
    if (!this.state.firstName || !this.state.lastName) {
      alert("Fill out your first and last name please!");
    } else if (this.state.password.length < 6) {
      alert(
        `Choose a more secure password ${this.state.firstName} ${this.state
          .lastName}`
      );
    } else {
      alert(`Hello ${this.state.firstName} ${this.state.lastName}`);
    }

    this.setState({
      firstName: "",
      lastName: "",
      password: ""
    });

    API.createUser(this.state).then((result) => {
      console.log(result.status); 
      if(result.status === 200){
        alert("welcome")
        Redirect('/profile');
      }
    });

  };

  render() {
    // Notice how each input has a `value`, `name`, and `onChange` prop
    return (
      <div>
            <p>
              Hello {this.state.firstName} {this.state.lastName}
            </p>
            <Form className="form">
              <FormGroup>
                <Label for="firstName"></Label>
                <Input type="text" value={this.state.firstName} name="firstName" onChange={this.handleInputChange} placeholder="First Name" />
                
                <Label for="lastName"></Label>
                <Input type="text" value={this.state.lastName} name="lastName" onChange={this.handleInputChange} placeholder="Last Name" />

                <Label for="password"></Label>
                <Input type="password" value={this.state.password} name="password" onChange={this.handleInputChange} placeholder="password" />
              </FormGroup>
              <Button onClick={this.handleFormSubmit}> Submit </Button>
            </Form>
      </div>
    );
  }
}

export default RegForm;
