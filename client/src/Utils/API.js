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
}