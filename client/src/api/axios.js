import axios from "axios";

const instance = axios.create({
    baseURL:'http://localhost:5001/api',//esta es la url de nuestro servidor backend
    withCredentials : true
})

export default instance 