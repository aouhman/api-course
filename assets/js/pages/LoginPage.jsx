import React, {useState, useContext} from 'react';
import AuthAPI from "../services/AuthAPI";
import AuthContext from "../../contexts/AuthContext";
import {Field} from "../forms/Field";


export const LoginPage = ({history}) => {
    const [credentials, setCredentials] = useState({
        username: "",
        password: ""
    });
    const [error, setError] = useState("");
    const {setIsAuthenticated} = useContext(AuthContext);
    const handleChange = ({currentTarget}) => {
        const {value, name} = currentTarget;
        setCredentials({...credentials, [name]: value})
    }
    const handleSubmit = async event => {
        event.preventDefault()
        try {
            await AuthAPI.authenticate(credentials);
            setError("");
            setIsAuthenticated(true)
            history.push("/customers")
        } catch (e) {
            console.log(e.response)
            setError("    Aucun compte ne possède cette adresse ou alors les informations ne correspondent pas")
        }


    }
    return (
        <>
            <h1>Page de connexion</h1>
            <form onSubmit={handleSubmit}>
                <Field onChange={handleChange} value={credentials.username} name="username"
                       placeholder="Adresse mail de connexion"
                       label="Adresse email"/>
                <Field onChange={handleChange} value={credentials.password} name="password" placeholder="Mot de passe"
                       type="password"
                       label="Mot de passe"/>
                <div className="form-group">
                    <button className="btn btn-success">
                        je me connecte
                    </button>
                </div>
            </form>
        </>
    );
};