import React, {useState} from 'react';


export const LoginPage = () => {
    const [credentials, setCredentials] = useState({
        username: "",
        password: ""
    });
    const handleChange = (event) => {
        const name = event.currentTarget.name;
        const value = event.currentTarget.value;
         setCredentials({...credentials,[name]:value})
    }
    const handleSubmit = event => {
        event.preventDefault()

        console.log(credentials);
    }
    return (
        <>
            <h1>Page de connexion</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Adresse email
                        <input className="form-control" type="email" id="username" name="username"
                               placeholder="Adresse mail de connexion"
                               value={credentials.username} onChange={handleChange}/>
                    </label>
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