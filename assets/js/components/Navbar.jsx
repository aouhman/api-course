import * as React from 'react';


export const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">SymReact</a>
                <div className="collapse navbar-collapse" id="navbarColor01">
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item">
                            <a className="nav-link" href="#">Factures</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Clients</a>
                        </li>
                    </ul>
                </div>
                <ul className="navbar-nav mal-auto">
                    <li className="nav-item">
                        <a href="#" className="nav-link">Inscription</a>
                    </li>

                    <li className="nav-item">
                        <a href="#" className="btn btn-success">Connexion</a>
                    </li>

                    <li className="nav-item">
                        <a href="#" className="btn btn-danger">Déconnexion</a>
                    </li>
                </ul>
            </div>
        </nav>
    );
};