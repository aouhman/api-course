import React, {useEffect, useState} from "react";
import InvoicesAPI from "../services/InvoicesAPI";
import moment from "moment";
import ReactPaginate from "react-paginate";
import axios from "axios";

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

export const InvoicesPageWithReactPagination = Props => {
    const [invoices, setInvoices] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalItems, setTotalItems] = useState(1);
    const [search, setSearch] = useState("");

    const formatDate = (str) => moment(str).format('DD/MM/YYYY')
    //number items for one page
    const itemsPerPage = 10;
    useEffect(() => {
        axios.get(`http://localhost:8000/api/invoices?pagination=true&count=${itemsPerPage}&page=${currentPage}`)
            .then(response => {
                setInvoices(response.data["hydra:member"]);
                setTotalItems(response.data["hydra:totalItems"])
            })
            .catch(error => console.log(error));
    }, [currentPage]);


    const handlePageChange = (data) => {
        let selected = data.selected;
        let offset = Math.ceil(selected+1);

        setCurrentPage(offset);
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


    const filteredInvoices  = invoices
        .filter(i =>
            i.customer.firstName.toLowerCase().includes(search.toLowerCase()) ||
            i.customer.lastName.toLowerCase().includes(search.toLowerCase()) ||
            STATUS_LABELS[i.status].toLowerCase().includes(search.toLowerCase()) ||
            i.amount.toString().startsWith(search.toLowerCase())

        )

        //  const paginatedInvoices = invoices
        //  Pagination.getData(filteredInvoices, currentPage, itemsPerPage)

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

                {filteredInvoices.map(({id, amount, sentAt, status, customer, chrono}) => <tr
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


            {filteredInvoices.length ===0 ? <tr><td>Chargement ...</td></tr>:
                <span className="text-center">
                <ReactPaginate
                previousLabel={'<'}
                nextLabel={'>'}
                breakLabel={'...'}
                breakClassName={'break-me'}
                pageCount={Math.ceil(totalItems/itemsPerPage)}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={handlePageChange}
                containerClassName={'pagination'}
                activeClassName={'active'}
            /></span>
                    }
        </>
    );
};
