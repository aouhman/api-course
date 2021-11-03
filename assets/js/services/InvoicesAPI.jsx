import axios from "axios";
import {INVOICES_URL} from "./Config";

function findAll() {
    return axios.get(`${INVOICES_URL}`)
        .then(response => response.data["hydra:member"])
}

async  function deleteInvoice(id) {
    return axios.delete(`${INVOICES_URL}/`+ id).then(response => {
        console.log(response)
    });
}

function find(id){
    return axios.get(`${INVOICES_URL}/`+ id)
        .then(response => response.data);

}

function update(id,invoice) {
    return  axios.put(`${INVOICES_URL}/`+ id, {...invoice,customer:`/api/customers/${invoice.customer}`});

}
function create(invoice) {
    return  axios.post(`${INVOICES_URL}`, {...invoice,customer:`/api/customers/${invoice.customer}`});
}

export default {
    findAll,
    find,
    update,
    create,
    delete: deleteInvoice
}
