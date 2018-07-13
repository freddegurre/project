import React, { Component } from "react";
import "./NewEventForm.css";
//import API from "../../Utils/API.js"
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';


class NewEventForm extends Component {
    //Setting the component initial state
    state = {
        eventName: "", 
        eventDetails: "", 
        eventDate: "", 
        eventMaxPpl: ""
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
        console.log(" this is state on NewEventForm ", this.state)
        if (!this.state.eventName || !this.state.eventDetails || !this.state.eventDate || !this.state.eventMaxPpl) {
          alert("Fill all fields");
        } else {
          alert(`will now post thist event ${this.state.eventName} `);
        }
    
        this.setState({
            eventName: "",
            eventDetails: "",
            eventDate: "", 
            eventMaxPpl: ""
        });

        API.newEvent(this.state).then((result) => {
            console.log(result.data);
         
        })

    };

    render(){
        return (
            <div>
                <p>New event {this.state.eventName}</p>
                <Form className="form">
                    <FormGroup>
                        <Label for="eventName">Event Name</Label>
                        <Input type="text" value={this.state.eventName} name="eventName" onChange={this.handleInputChange} placeholder="Event Name" />

                        <Label for="eventDetails">Event Details</Label>
                        <Input type="text" value={this.state.eventDetails} name="eventDetails" onChange={this.handleInputChange} placeholder="Event Details" />

                    </FormGroup>
                    <Button onClick={this.handleFormSubmit}> Login </Button>
                </Form>
            </div>
        )
    }


}

export default NewEventForm; 