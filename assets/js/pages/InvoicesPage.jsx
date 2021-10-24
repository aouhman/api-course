import React, {useEffect, useState} from "react";
import {Pagination} from "../components/Pagination";
import InvoicesAPI from "../services/InvoicesAPI";
import moment from "moment";

const STATUS_CLASSES = {
    PAID:"success",
    SENT:"info",
    CANCELLED:'danger'
}

const STATUS_LABELS= {
    PAID:"Payée",
    SENT:"Envoyée",
    CANCELLED:'Annulée'
}

export const InvoicesPage = Props => {
    const [invoices, setInvoices] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");

    const fetchInvoices = async () => {
        try {
            const data = await InvoicesAPI.findAll()
            setInvoices(data)
        } catch (e) {
            console.log(e.response)
        }
    }
    const formatDate = (str) => moment(str).format('DD/MM/YYYY')

    useEffect(() => {
        fetchInvoices();
    }, []);


    const handlePageChange = (page) => {
        setCurrentPage(page);
    }

    const handleDelete = async (id) => {
        const originalInvoices = [...invoices];
        // approche optimiste
        setInvoices(invoices.filter(invoice => invoice.id !== id));

        try {
            await InvoicesAPI.delete(id)
        } catch (e) {
            setInvoices(originalInvoices);
        }

    }


    const itemsPerPage = 10;
    const filtredInvoices  = invoices
        .filter(i =>
            i.customer.firstName.toLowerCase().includes(search.toLowerCase()) ||
            i.customer.lastName.toLowerCase().includes(search.toLowerCase()) ||
            STATUS_LABELS[i.status].toLowerCase().includes(search.toLowerCase()) ||
            i.amount.toString().startsWith(search.toLowerCase())

        )

    const paginatedInvoices = Pagination.getData(filtredInvoices, currentPage, itemsPerPage)

    const handleSearch = (event) => {
        setSearch(event.currentTarget.value);
        setCurrentPage(1);
    }

    return (
        <>
            <div className="form-group">
                <input onChange={handleSearch} type="text" value={search} className="form-control"
                       placeholder={"Rechercher ..."}/>
            </div>
            <table className="table table-hover">
                <thead>
                <tr>
                    <th>Numéro</th>
                    <th>Client</th>
                    <th>Date d'envoi</th>
                    <th className="text-right">Status</th>
                    <th className="text-right">Montant</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>

                {paginatedInvoices.map(({id, amount, sentAt, status, customer, chrono}) => <tr
                    key={id}>
                    <td>{chrono}</td>
                    <td>{customer.firstName} {customer.lastName}</td>
                    <td>{formatDate(sentAt)}</td>
                    <td className="text-right">
                        <span className={"text-white badge alert-" +  STATUS_CLASSES[status]}>
                            {STATUS_LABELS[status]}
                        </span>
                    </td>
                    <td className="text-right"> {amount.toLocaleString()} $</td>
                    <th>
                        <button onClick={() => handleDelete(id)}
                                className="btn-danger btn">Supprimer
                        </button>

                    </th>
                </tr>)}

                </tbody>
            </table>
            {filtredInvoices.length > itemsPerPage &&
            <Pagination currentPage={currentPage} itemsPerPage={itemsPerPage} length={filtredInvoices.length}
                        onPageChanged={handlePageChange}/>}


        </>
    );
};
