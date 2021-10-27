import AuthContext from "../../contexts/AuthContext";
import {Redirect, Route} from "react-router-dom";
import  React,{useContext} from 'react';

export  const PrivateRoute = ({path, component}) => {
    const {isAuthenticated} = useContext(AuthContext);
    return isAuthenticated ? <Route path={path} component={component}/> : <Redirect to="/login"/>
}