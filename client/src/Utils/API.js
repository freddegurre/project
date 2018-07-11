import axios from "axios"; 

export default {
    createUser:function(userData){
        return axios.post("/api/newUser", userData)
    },
    loginUser:function(userData){
        return axios.post("/api/login", userData)
    }
}