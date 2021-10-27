import axios from "axios";
import jwtDecode from "jwt-decode";

function setAxiosToken(token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

function authenticate(credentials) {
    return axios.post("http://localhost:8000/api/login_check", credentials)
        .then(response => response.data.token)
        .then(token => {
            setAxiosToken(token)
            window.localStorage.setItem("authToken", token);
            return true;
        });
}

function logout() {
    window.localStorage.removeItem("authToken");
    delete axios.defaults.headers.common['Authorization'];
}

function setup() {

    if (isAuthenticated()) {
        setAxiosToken(window.localStorage.getItem("authToken"));
    }
}

function isAuthenticated() {
    const token = window.localStorage.getItem("authToken");
    if (token) {
        const {exp: expiration} = jwtDecode(token);
        if (expiration * 1000 > new Date().getTime()) {
            return true
        }
    }
    return false;
}

export default {
    authenticate,
    logout,
    isAuthenticated,
    setup
}
