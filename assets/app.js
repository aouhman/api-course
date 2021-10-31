/*
 * Welcome to your app's main JavaScript file!
 *
 * We recommend including the built version of this JavaScript file
 * (and its CSS file) in your base layout (base.html.twig).
 */

// any CSS you import will output into a single css file (app.css in this case)
import React, {useState} from "react";
import ReactDom from "react-dom";
import './styles/app.css';
import {Navbar} from "./js/components/Navbar";
// start the Stimulus application
import './bootstrap';
import {HomePage} from "./js/pages/HomePage";
import {HashRouter, Route, Switch, withRouter} from "react-router-dom";
import {CustomerPage} from "./js/pages/CustomerPage";
import {CustomersPage} from "./js/pages/CustomersPage";
import {CustomersPageWithPagination} from "./js/pages/CustomersPageWithPagination";
import {InvoicesPage} from "./js/pages/InvoicesPage";
import {InvoicesPageWithReactPagination} from "./js/pages/InvoicesPageWithReactPagination";
import {LoginPage} from "./js/pages/LoginPage";
import AuthAPI from "./js/services/AuthAPI";
import AuthContext from "./contexts/AuthContext";
import {PrivateRoute} from "./js/components/PrivateRoute";
import {InvoicePage} from "./js/pages/InvoicePage";
import {RegisterPage} from "./js/pages/RegisterPage";

AuthAPI.setup()
const App = () => {
    const NavbarWithRouter = withRouter(Navbar);
    const [isAuthenticated, setIsAuthenticated] = useState(AuthAPI.isAuthenticated());
    return (
        <AuthContext.Provider value={{
            isAuthenticated,
            setIsAuthenticated
        }}>
            <HashRouter>
                <NavbarWithRouter/>
                <main className="container pt-5">
                    <Switch>
                        <Route path="/login" component={LoginPage}/>
                        <Route path="/register" component={RegisterPage}/>
                        <Route path="/customerspagewithpagination" component={CustomersPageWithPagination}/>
                        <PrivateRoute component={CustomerPage} path="/customers/:id"/>
                        <PrivateRoute component={InvoicePage} path="/invoices/:id"/>
                        <PrivateRoute component={CustomersPage} path="/customers"/>
                        <PrivateRoute component={InvoicesPage} path="/invoices"/>
                        <Route path="/invoicespagewithreactpagination" component={InvoicesPageWithReactPagination}/>
                        <Route path="/" component={HomePage}/>
                    </Switch>
                </main>
            </HashRouter>
        </AuthContext.Provider>
    );
}

const rootElement = document.querySelector("#app")
ReactDom.render(<App/>, rootElement);

console.log("hello world  !!");