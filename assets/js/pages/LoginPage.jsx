import React, {useState} from 'react';
import AuthAPI from "../services/AuthAPI";


export const LoginPage = () => {
    const [credentials, setCredentials] = useState({
        username: "",
        password: ""
    });
    const [error, setError] = useState("");
    const handleChange = ({currentTarget}) => {
        const  {value,name} = currentTarget;
        setCredentials({...credentials, [name]: value})
    }
    const handleSubmit = async event => {
        event.preventDefault()
        try {
            await AuthAPI.authenticate(credentials);
            setError("");
        } catch (e) {
            console.log(e.response)
            setError("    Aucun compte ne possède cette adresse ou alors les informations ne correspondent pas")
        }


        console.log(credentials);
    }
    return (
        <>
            <h1>Page de connexion</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Adresse email
                        <input className={"form-control " + (error && "is-invalid")} type="email" id="username"
                               name="username"
                               placeholder="Adresse mail de connexion"
                               value={credentials.username} onChange={handleChange}/>
                    </label>
                    {error && <div className="invalid-feedback d-block">
                        {error}
                    </div>
                    }

                </div>
                <div className="form-group">
                    <label htmlFor="password">Mot de passe
                        <input className="form-control" type="password" id="password" name="password"
                               placeholder="Mot de passe" value={credentials.password} onChange={handleChange}/>
                    </label>
                </div>
                <div className="form-group">
                    <button className="btn btn-success">
                        je me connecte
                    </button>
                </div>
            </form>
        </>
    );
};