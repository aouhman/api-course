import React, {useState, useEffect} from "react";
import {Field} from "../forms/Field";
import {Link} from "react-router-dom";
import CustomersAPI from "../services/CustomersAPI";
import {toast} from "react-toastify";
import FormContentLoader from "../loaders/FormContentLoader";

export const CustomerPage = ({match, history}) => {
    const {id = "new"} = match.params;

    const [customer, setCustomer] = useState({
        lastName: '',
        firstName: '',
        email: '',
        company: ''
    });

    const [errors, setErrors] = useState({
        lastName: '',
        firstName: '',
        email: '',
        company: ''
    });
    const [editing, setEditing] = useState(false);
    const [loading, setLoading] = useState(true);

    const fetchCustomer = async (id) => {
        try {
            const {lastName, firstName, email, company} = await CustomersAPI.find(id);
            setCustomer({lastName, firstName, email, company});
            setLoading(false)

        } catch (e) {
            toast.error("Une erreur est survenue")
            history.replace("/customers")
        }
    }
    useEffect(() => {
        if (id !== "new") {
            fetchCustomer(id);
            setEditing(true);
        }else{
            setLoading(false)
        }
    }, [id]);


    const handleChange = ({currentTarget}) => {
        const {name, value} = currentTarget;
        setCustomer({...customer, [name]: value})
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        setErrors({});

        try {
            if (editing) {
                await CustomersAPI.update(id, customer);
                toast.success("Le client à bien été bien modifié")
            } else {
                await CustomersAPI.create(customer)
                toast.success("Le client à bien été bien crée")

                history.replace("/customers");
            }
        } catch ({response}) {
            const {violations} = response.data;
            if (violations) {
                const apiErrors = {};
                violations.forEach(({propertyPath, message}) => {
                    apiErrors[propertyPath] = message;
                })
                toast.error("Une erreur est survenue")
                setErrors(apiErrors);
            }
        }

    }
    return (
        <>

            {!editing ? (<h1>Création du client</h1>) : <h1>Modification du client</h1>}
            {loading ? (<FormContentLoader/>) : (
                <form onSubmit={handleSubmit}>
                    <Field onChange={handleChange} error={errors.lastName} value={customer.lastName} name="lastName"
                           placeholder="Nom de famille du client" label="Nom du client"/>
                    <Field onChange={handleChange} error={errors.firstName} value={customer.firstName} name="firstName"
                           placeholder="Prénom de famille du client" label="Prénom du client"/>
                    <Field onChange={handleChange} error={errors.email} value={customer.email} name="email"
                           placeholder="email du client"
                           label="email du client" type="email"/>
                    <Field onChange={handleChange} error={errors.company} value={customer.company} name="company"
                           placeholder="Entreprise"
                           label="Entreprise du client"/>
                    <div className="form-group">
                        <button type="submit" className="btn-success btn">
                            Enregistrer
                        </button>
                        <Link to="/customers" className="btn btn-primary">
                            Retourner
                        </Link>
                    </div>
                </form>)}
        </>

    );
};
