import React, {useEffect, useState} from "react";
import axios from 'axios'

export const CustomersPage = Props => {

    const [customers, setCustomers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        axios.get("http://localhost:8000/api/customers").then(response => response.data["hydra:member"])
            .then(data => setCustomers(data))
            .catch(error => console.log(error));
    }, []);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    }

    const handleDelete = (id) => {
        const originalCustomers = [...customers];
        // aproche pagination
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
    const pageCount = Math.ceil(customers.length / itemsPerPage);
    const pages = [];
    for (let i = 1; i <= itemsPerPage; i++) {
        pages.push(i);
    }
    const start = currentPage * itemsPerPage  - itemsPerPage ;
    const paginatedCustomers = customers.slice(start,start+itemsPerPage)

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
                {paginatedCustomers.map(customer => <tr key={customer.id}>
                    <td>{customer.id}</td>
                    <td>{customer.firstName}{customer.lastName}</td>
                    <td>{customer.email}</td>
                    <td>{customer.company}</td>
                    <td className="text-right"> {customer.invoices.length}</td>
                    <td className="text-right">{customer.totalAmount.toLocaleString()} $</td>
                    <th>
                        {customer.invoices.length ? <></>
                            : <button onClick={() => handleDelete(customer.id)}
                                      className="btn-danger btn">Supprimer</button>}

                    </th>
                </tr>)}

                </tbody>
            </table>

            <div>
                <ul className="pagination pagination-sm">
                    <li className={"page-item " + (currentPage === 1 && "disabled")}>
                        <button className="page-link" onClick={() => handlePageChange(currentPage - 1)}>&laquo;</button>
                    </li>
                    {pages.map(page => <li key={page} className={"page-item " + (page === currentPage && "active")}>
                        <button className="page-link" onClick={() => handlePageChange(page)}>{page}</button>
                    </li>)}
                    <li className={"page-item " + (currentPage === pageCount && "disabled")}>
                        <button className="page-link" onClick={() => handlePageChange(currentPage + 1)}>&raquo;</button>
                    </li>
                </ul>
            </div>
        </>
    );
};