import React, { Component } from "react";
import ProfileCard from "../../Components/ProfileCard";
import API from '../../Utils/API.js'

class Profile extends Component {
    
    state = {
            user: ""
        
        };

    loadUser = () => {
        API.getUserData().then((result) => {
            console.log(result); 
        })
    }

    render = () => {
        return (
            <ProfileCard />
        )
    }
}

export default Profile;