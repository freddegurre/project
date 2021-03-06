import axios from "axios"; 

export default {
    createUser:function(userData){
        return axios.post("/api/newUser", userData)
    },
    loginUser:function(userData){
        return axios.post("/api/login", userData)
    },
    getUserData: function () {
        return axios.get('/api/user')
    },
    checkIfsession: function (){
        return axios.get("/api/session");
    },
    newEvent: function(eventData){
        return axios.post("/api/newEvent", eventData); 
    },
    allEvents: function(){
        return axios.get("/api/allEvents"); 
    },
    events: function (){
        return axios.get("/api/events");
    },
    joinEvent: function(data){
        return axios.put("/api/joinEvent", data); 
    }, 
    suggestedFriend: function(){
        return axios.get("/api/suggestedFriends"); 
    }, 
    follow: function (data){
        return axios.put("/api/follow", data); 
    }, 
    following: function (){
        return axios.get("/api/following");
    }
}