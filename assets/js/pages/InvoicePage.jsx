import React, {useState, useEffect} from "react";
import {Field} from "../forms/Field";
import {Link} from "react-router-dom";
import InvoicesAPI from "../services/InvoicesAPI";
import {Select} from "../forms/Select";
import CustomersAPI from "../services/CustomersAPI";
import {toast} from "react-toastify";
import FormContentLoader from "../loaders/FormContentLoader";

export const InvoicePage = ({match, history}) => {
    const {id = "new"} = match.params;

    const [invoice, setInvoice] = useState({
        amount: '',
        customer: '',
        status: 'SENT'
    });

    const [errors, setErrors] = useState({
        amount: '',
        customer: '',
        status: ''
    });
    const [editing, setEditing] = useState(false);
    const [loading, setLoading] = useState(true);

    const fetchInvoice = async (id) => {
        try {
            setLoading(true);
            const {amount, customer, status} = await InvoicesAPI.find(id);
            setInvoice({amount, customer: customer.id, status});
            setLoading(false);

        } catch (e) {
            toast.error("Impossible de charger la facture demandé")

            history.replace("/invoices")
        }
    }
    const [customers, setCustomers] = useState([]);
    const fetchCustomers = async () => {
        try {
            setLoading( true);
            const data = await CustomersAPI.findAll();
            setCustomers(data);

            if (!invoice.customer) setInvoice({...invoice, customer: data[0].id});
            setLoading(false);
        } catch (e) {
            toast.error("Impossible de charger les clients")
            console.log(e.response)
        }
    }
    useEffect(() => {
        fetchCustomers()
        setLoading(false)

    }, []);


    useEffect(() => {
        if (id !== "new") {

            fetchInvoice(id);
            setEditing(true);

        }
    }, [id]);


    const handleChange = ({currentTarget}) => {
        const {name, value} = currentTarget;
        setInvoice({...invoice, [name]: value})
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            if (editing) {
                await InvoicesAPI.update(id, invoice);
                toast.success("La facture à bien été modifié")
            } else {
                await InvoicesAPI.create(invoice)
                toast.success("La facture à bien été crée")
                history.replace("/invoices");
            }
            setErrors({});
        } catch ({response}) {
            const {violations} = response.data;
            if (violations) {
                const apiErrors = {};
                violations.forEach(({propertyPath, message}) => {
                    apiErrors[propertyPath] = message;
                })
                setErrors(apiErrors);
                toast.error("Une erreur est survenue")
            }
        }

    }
    return (
        <>
            {!editing ? (<h1>Création de la facture</h1>) : <h1>Modification de la facture</h1>}
            {loading ?(<FormContentLoader/>):
                (<form onSubmit={handleSubmit}>
                <Field onChange={handleChange} error={errors.amount} value={invoice.amount} name="amount"
                       placeholder="Montant de la facture" type="number" label="Montant de la facture"/>
                <Select onChange={handleChange} error={errors.customer} value={invoice.customer} name="customer"
                        label="Client de la facture">
                    {customers.map(customer => <option key={customer.id}
                                                       value={customer.id}> {customer.firstName} {customer.lastName} </option>)}
                </Select>
                <Select onChange={handleChange} error={errors.status} value={invoice.status} name="status"
                        label="Status de la facture">
                    <option value="SENT">Envoyée</option>
                    <option value="PAID">Paye</option>
                    <option value="CANCELLED">Annulée</option>
                </Select>


                <div className="form-group">
                    <button type="submit" className="btn-success btn">
                        Enregistrer
                    </button>
                    <Link to="/invoices" className="btn btn-primary">
                        Retourner
                    </Link>
                </div>
            </form>)}
        </>

    );
};
