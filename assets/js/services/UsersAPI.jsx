import axios from "axios";
import {USERS_URL} from "./Config";


function register(user) {
    return   axios.post(USERS_URL,user)
}

export default {

    register
}
