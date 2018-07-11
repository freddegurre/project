import React, { Component } from "react";
import "./LoginForm.css";
import API from "../../Utils/API.js"
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

class LoginForm extends Component {
    //Setting the component initial state
    state = {
        firstName: "", 
        password: ""
    }; 

    handleInputChange = event => {
        // Getting the value and name of the input which triggered the change
        let value = event.target.value;
        const name = event.target.name;
    
        // Updating the input's state
        this.setState({
          [name]: value
        });
      };

    handleFormSubmit = event => {
        // Preventing the default behavior of the form submit (which is to refresh the page)
        event.preventDefault();
        console.log(" this is state ", this.state)
        if (!this.state.firstName || !this.state.password) {
          alert("Fill out your first and password please!");
        } else if (this.state.password.length < 6) {
          alert(
            `Password is to short ${this.state.firstName} `);
        } else {
          alert(`Lets check your pass ${this.state.firstName} `);
        }
    
        this.setState({
          firstName: "",
          password: ""
        });

        API.loginUser(this.state).then((result) => {
            console.log(result); 
        })
    
        // API.createUser(this.state).then((result) => {
        //   console.log(result.status); 
        //   if(result.status === 200){
        //     alert("welcome")
        //     //Redirect('/profile');
        //   }
        // });
    };

    render(){
        return (
            <div>
                <p>Hello {this.state.firstName}</p>
                <Form className="form">
                    <FormGroup>
                        <Label for="firstName">First Name</Label>
                        <Input type="text" value={this.state.firstName} name="firstName" onChange={this.handleInputChange} placeholder="First Name" />

                        <Label for="password">Password</Label>
                        <Input type="password" value={this.state.password} name="password" onChange={this.handleInputChange} placeholder="password" />

                    </FormGroup>
                    <Button onClick={this.handleFormSubmit}> Login </Button>
                </Form>
            </div>
        )
    }


}

export default LoginForm; 