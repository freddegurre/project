import React, {Component} from "react"; 
import API from '../../Utils/API.js'
import "./Home.css";
import { Container, Row, Col } from 'reactstrap';
import NavBar from "../../Components/NavBar";
import EventModal from "../../Components/EventModal"


class Home extends Component {

    state = {
        events: []
    }

    componentDidMount(){
        this.events(); 
    }

    events = () => {
        API.events().then(() => {
            console.log("it hit")
        })
    }


    render = () => {
        return(
            <div>
                <NavBar />
                <div className="Heading">
                    <div className="Header">
                        <h2> Home </h2>
                    </div>
                </div>
                <EventModal />
            </div>
        )
        
    }

}

export default Home; 