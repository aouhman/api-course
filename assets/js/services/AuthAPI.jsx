import axios from "axios";
import CustomersAPI from "./CustomersAPI";

function authenticate(credentials) {


 return    axios.post("http://localhost:8000/api/login_check", credentials)
        .then(response => response.data.token)
        .then(token =>{
            window.localStorage.setItem("authToken", token);
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            return  true;
        });

}
export default {
    authenticate
}
