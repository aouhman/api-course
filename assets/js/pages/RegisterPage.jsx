import React, {useState} from 'react';
import {Field} from "../forms/Field";
import UsersAPI from "../services/UsersAPI";
import {Link} from "react-router-dom";
import {toast} from "react-toastify";


export const RegisterPage = ({match, history}) => {
    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        passwordConfirm: ""
    });
    const [errors, setErrors] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        passwordConfirm: ""

    });
    const handleChange = ({currentTarget}) => {
        const {name, value} = currentTarget;
        setUser({...user, [name]: value})

    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        const apiErrors = {};
        if (user.password !== user.passwordConfirm) {
            apiErrors.passwordConfirm = "Votre confirmation de mot de passe n'est pas conforme avec le mot de passe original"
            toast.error("Des erreurs dans votre formulaire")
            setErrors(apiErrors);
            return;
        }
        try {
            await UsersAPI.register("http://localhost:8000/api/users", user)
            setErrors({});
            toast.success("Vous êtes désormais inscrit,vous pouvez vous connecter!")
            history.replace("/login")
        } catch ({response}) {
            const {violations} = response.data;
            if (violations) {
                violations.forEach(({propertyPath, message}) => {
                    apiErrors[propertyPath] = message;
                })
                setErrors(apiErrors);
                toast.error("Des erreurs dans votre formulaire")
            }
        }
    }

    return (
        <div>
            <h1> Inscription</h1>
            <form onSubmit={handleSubmit}>
                <Field name="firstName"
                       error={errors.firstName}
                       value={user.firstName}
                       onChange={handleChange}
                       label="Le prénom de l'utilisateur"
                       placeholder="Le prénom de l'utilisateur"/>

                <Field name="lastName"
                       error={errors.lastName}
                       value={user.lastName}
                       onChange={handleChange}
                       label="Le nom de l'utilisateur"
                       placeholder="Le nom de l'utilisateur"/>

                <Field name="email" error={errors.email}
                       value={user.email}
                       onChange={handleChange}
                       label="email de l'utilisateur"
                       placeholder="email de l'utilisateur"
                       type="email"/>

                <Field name="password"
                       error={errors.password}
                       value={user.password}
                       onChange={handleChange}
                       label="mot de passe  l'utilisateur"
                       placeholder="mot de passe  l'utilisateur"
                       type="password"/>

                <Field name="passwordConfirm"
                       error={errors.passwordConfirm}
                       value={user.passwordConfirm}
                       onChange={handleChange}
                       label="confirmation  de passe  l'utilisateur"
                       placeholder="confirmation de mot de passe  l'utilisateur"
                       type="password"/>

                <div className="form-group">
                    <button type="submit" className="btn-success btn">
                        Enregistrer
                    </button>
                    <Link to="/login" className="btn btn-link">
                        J'ai déjà un compte
                    </Link>
                </div>
            </form>
        </div>
    );
};