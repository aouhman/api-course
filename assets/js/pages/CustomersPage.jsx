import React, {useEffect, useState} from "react";
import axios from 'axios'

export const CustomersPage = Props => {

    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8000/api/customers").then( response => response.data["hydra:member"])
            .then(data => setCustomers(data))
            .catch(error => console.log(error))
    }, []);

    return (
        <>
            <table className="table table-hover">
                <thead>
                <tr>
                    <th>Id</th>
                    <th>Client</th>
                    <th>Email</th>
                    <th>Enterprise</th>
                    <th className="text-right">Factures</th>
                    <th className="text-right">Montant total</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {customers.map(customer => <tr key={customer.id}>
                    <td>{customer.id}</td>
                    <td>{customer.firstName}{customer.lastName}</td>
                    <td>{customer.email}</td>
                    <td>{customer.company}</td>
                    <td className="text-right"> {customer.invoices.length}</td>
                    <td className="text-right">{customer.totalAmount.toLocaleString()} $</td>
                    <th>
                        <button className="btn-danger btn">Supprimer</button>
                    </th>
                </tr>)}

                </tbody>
            </table>
        </>
    );
};