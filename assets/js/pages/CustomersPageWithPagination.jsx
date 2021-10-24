import React, {useEffect, useState} from "react";
import axios from 'axios'
import {Pagination} from "../components/Pagination";


export const CustomersPageWithPagination = Props => {

    const [customers, setCustomers] = useState([]);
    const [totalItems, setTotalItems] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        axios.get(`http://localhost:8000/api/customers?pagination=true&count=${itemsPerPage}&page=${currentPage}`)
            .then(response => {
                setCustomers(response.data["hydra:member"])
                setTotalItems(response.data["hydra:totalItems"])
            })
            .catch(error => console.log(error));
    }, [currentPage]);

    const handlePageChange = (page) => {
        setCustomers([]);
        setCurrentPage(page);
    }

    const handleDelete = (id) => {
        const originalCustomers = [...customers];
        // approche optimiste
        setCustomers(customers.filter(customer => customer.id !== id));
        axios.delete("http://localhost:8000/api/customers/" + id).then(response => {
            console.log(response)
        })
            .catch(error => {
                setCustomers(originalCustomers);
                console.log(error)
            });
    }
    const itemsPerPage = 10;

    return (
        <>
            <h1>Liste des clients (pagination)</h1>
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
                {customers.length ===0 && <tr><td>Chargement ...</td></tr>}
                {customers.map(({company, email, firstName, id, invoices, lastName, totalAmount}) => <tr
                    key={id}>
                    <td>{id}</td>
                    <td>{firstName}{lastName}</td>
                    <td>{email}</td>
                    <td>{company}</td>
                    <td className="text-right"> {invoices.length}</td>
                    <td className="text-right">{totalAmount.toLocaleString()} $</td>
                    <th>
                        {invoices.length ? <></>
                            : <button onClick={() => handleDelete(id)}
                                      className="btn-danger btn">Supprimer</button>}

                    </th>
                </tr>)}

                </tbody>
            </table>
            <Pagination currentPage={currentPage} itemsPerPage={itemsPerPage} length={totalItems}
                        onPageChanged={handlePageChange}/>

        </>
    );
};