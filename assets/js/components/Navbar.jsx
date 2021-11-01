import  React,{useContext} from 'react';
import AuthAPI from "../services/AuthAPI";
import {NavLink} from "react-router-dom";
import AuthContext from "../../contexts/AuthContext";
import {toast} from "react-toastify";


export const Navbar = ({history}) => {

    const {isAuthenticated,setIsAuthenticated} = useContext(AuthContext);
    const handleLogout = () => {
        AuthAPI.logout();
        history.push("/login");
        toast.info("Vous êtes désormais déconnecté 😀");
        setIsAuthenticated(false)
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