import * as React from 'react';
import AuthAPI from "../services/AuthAPI";
import {NavLink} from "react-router-dom";


export const Navbar = ({isAuthenticated, onLogout}) => {

    const handleLogout = () => {
        AuthAPI.logout();
        onLogout(false)
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <NavLink className="navbar-brand" to="/">SymReact</NavLink>
                <div className="collapse navbar-collapse" id="navbarColor01">
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/customers">Clients</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/invoices">Factures</NavLink>
                        </li>
                    </ul>
                </div>

                <ul className="navbar-nav mal-auto">

                    {!isAuthenticated ?
                        (<>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/register">Inscription</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="btn btn-success" to="/login">Connexion</NavLink>
                            </li>
                        </>) : (<li className="nav-item">
                            <button onClick={handleLogout} className="btn btn-danger">Déconnexion</button>
                        </li>)
                    }


                </ul>
            </div>
        </nav>
    );
};