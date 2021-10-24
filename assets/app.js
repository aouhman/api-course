/*
 * Welcome to your app's main JavaScript file!
 *
 * We recommend including the built version of this JavaScript file
 * (and its CSS file) in your base layout (base.html.twig).
 */

// any CSS you import will output into a single css file (app.css in this case)
import React from "react";
import ReactDom from "react-dom";
import './styles/app.css';
import {Navbar} from "./js/components/Navbar";
// start the Stimulus application
import './bootstrap';
import {HomePage} from "./js/pages/HomePage";
import {HashRouter, Route, Switch,} from "react-router-dom";
import {CustomersPage} from "./js/pages/CustomersPage";
import {CustomersPageWithPagination} from "./js/pages/CustomersPageWithPagination";

const App = () => {
    return (
        <HashRouter>
            <Navbar/>
            <main className="container pt-5">
                <Switch>
                    <Route path="/customerspagewithpagination" component={CustomersPageWithPagination}/>
                    <Route path="/customers" component={CustomersPage}/>
                    <Route path="/" component={HomePage}/>
                </Switch>
            </main>
        </HashRouter>);
}

const rootElement = document.querySelector("#app")
ReactDom.render(<App/>, rootElement);

console.log("hello world  !!");