import React, {useEffect, useState} from "react";
import {Pagination} from "../components/Pagination";
import CustomersAPI from "../services/CustomersAPI";
import {Link} from "react-router-dom";


export const CustomersPage = Props => {
    const [customers, setCustomers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");

    const fetchCustomers = async () => {
        try {
            const data = await CustomersAPI.findAll()
            setCustomers(data)
        } catch (e) {
            console.log(e.response)
        }
    }

    useEffect(() => {
        fetchCustomers();
    }, []);


    const handlePageChange = (page) => {
        setCurrentPage(page);
    }

    const handleDelete = async (id) => {
        const originalCustomers = [...customers];
        // approche optimiste
        setCustomers(customers.filter(customer => customer.id !== id));

        try {
            await CustomersAPI.delete(id)
        } catch (e) {
            setCustomers(originalCustomers);
        }
        /*
        CustomersAPI.delete(id)
            .catch(error => {
                setCustomers(originalCustomers);
                console.log(error)
            });
            */
    }


    const itemsPerPage = 10;
    const filteredCustomers = customers
        .filter(c =>
            c.firstName.toLowerCase().includes(search.toLowerCase()) ||
            c.lastName.toLowerCase().includes(search.toLowerCase()) ||
            c.email.toLowerCase().includes(search.toLowerCase()) ||
            (c.company && c.company.toLowerCase().includes(search.toLowerCase()))
        )

    const paginatedCustomers = Pagination.getData(filteredCustomers, currentPage, itemsPerPage)

    const handleSearch = (event) => {
        setSearch(event.currentTarget.value);
        setCurrentPage(1);
    }

    return (
        <>
            <div className="d-flex justify-content-between align-items-center">

            </div>
            <div className="form-group">
                <input onChange={handleSearch} type="text" value={search} className="form-control"
                       placeholder={"Rechercher ..."}/>
            </div>
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
                {paginatedCustomers.map(({company, email, firstName, id, invoices, lastName, totalAmount}) => <tr
                    key={id}>
                    <td>{id}</td>
                    <td>{firstName} {lastName}</td>
                    <td>{email}</td>
                    <td>{company}</td>
                    <td className="text-right"> {invoices.length}</td>
                    <td className="text-right">{totalAmount.toLocaleString()} $</td>
                    <th>
                        <Link to={`/customers/${id}`} className="btn btn-primary">
                            modifier
                        </Link>
                        {invoices.length ? <></>
                            : <button onClick={() => handleDelete(id)}
                                      className="btn-danger btn">Supprimer</button>}

                    </th>
                </tr>)}

                </tbody>
            </table>
            {filteredCustomers.length > itemsPerPage &&
            <Pagination currentPage={currentPage} itemsPerPage={itemsPerPage} length={filteredCustomers.length}
                        onPageChanged={handlePageChange}/>}


        </>
    );
};
