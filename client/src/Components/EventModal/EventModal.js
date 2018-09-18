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
        category:"",
        startTime: "", 
        endTime: "", 
        eventMaxPpl: "",
        eventLocation:"",
        private:true,
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
    if (!this.state.eventName || !this.state.category || !this.state.startTime || !this.state.endTime) {
      alert("Fill all fields");
    } else {
      alert(`will now post thist event ${this.state.eventName} `);
    }

    this.setState({
        eventName: "",
        category: "",
        eventDetails: "",
        startTime: "",
        endTime:"",
        eventMaxPpl: "", 
        eventLocation: "",
        private: false,
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
          <ModalHeader toggle={this.toggle}>New event!</ModalHeader>
          <ModalBody>
          <div>
                <Form className="form">
                    <FormGroup>
                        <Label for="eventName">Event Name</Label>
                        <Input type="text" value={this.state.eventName} name="eventName" onChange={this.handleInputChange} placeholder="Event Name" />
                        
                        <Label for="category">Category</Label>
                        <Input type="select" name="category" id="category" onChange={this.handleInputChange} >
                          <option>Walk</option>
                          <option>Lunch</option>
                          <option>Gym</option>
                          <option>Dinner</option>
                          <option>Drinks</option>
                        </Input>

                        <Label for="startTime">Start Time</Label>
                        <Input type="date" value={this.state.startTime} name="startTime" onChange={this.handleInputChange} placeholder="Start Time" />
                        
                        <Label for="endTime">End Time</Label>
                        <Input type="date" value={this.state.endTime} name="endTime" onChange={this.handleInputChange} placeholder="End Time" />

                        <Label for="eventMaxPpl">Max people</Label>
                        <Input type="number" value={this.state.eventMaxPpl} name="eventMaxPpl" onChange={this.handleInputChange} placeholder="Max people" />

                        <Label for="eventLocation">Event Location</Label>
                        <Input type="text" value={this.state.eventLocation} name="eventLocation" onChange={this.handleInputChange} placeholder="Will update to map" />

                        <Label for="private" check>
                        <Input type="checkbox" value={this.state.private} name="private" onChange={this.handleInputChange} defaultChecked={true}/>{}
                          Private event
                        </Label>
                        
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