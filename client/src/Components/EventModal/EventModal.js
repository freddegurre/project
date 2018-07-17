import React, { Component } from "react";
import API from "../../Utils/API.js"
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Form, FormGroup, Label, Input } from 'reactstrap';

class EventModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        modal: false, 
        eventName: "", 
        eventDetails: "", 
        eventDate: "", 
        eventMaxPpl: "", 
        eventLocation: ""
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

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
        eventMaxPpl: "", 
        eventLocation: ""
    });

    API.newEvent(this.state).then((result) => {
        this.toggle()
    })

};

  render() {
    return (
      <div>
        <Button color="danger" onClick={this.toggle}>{this.props.buttonLabel}New Event</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
          <ModalBody>
          <div>
                <p>New event {this.state.eventName}</p>
                <Form className="form">
                    <FormGroup>
                        <Label for="eventName">Event Name</Label>
                        <Input type="text" value={this.state.eventName} name="eventName" onChange={this.handleInputChange} placeholder="Event Name" />

                        <Label for="eventDetails">Event Details</Label>
                        <Input type="text" value={this.state.eventDetails} name="eventDetails" onChange={this.handleInputChange} placeholder="Event Details" />

                        <Label for="eventDate">Event Date</Label>
                        <Input type="text" value={this.state.eventDate} name="eventDate" onChange={this.handleInputChange} placeholder="Event Date" />

                        <Label for="eventMaxPpl">Max people</Label>
                        <Input type="text" value={this.state.eventMaxPpl} name="eventMaxPpl" onChange={this.handleInputChange} placeholder="Max people" />

                        <Label for="eventLocation">Event Location</Label>
                        <Input type="text" value={this.state.eventLocation} name="eventLocation" onChange={this.handleInputChange} placeholder="Event Location" />

                    </FormGroup>
                </Form>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.handleFormSubmit}>Create</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default EventModal;