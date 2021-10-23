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

// start the Stimulus application
import './bootstrap';

const App = () => {
     return <h1>Hello React</h1> ;
}

const rootElement = document.querySelector("#app")
ReactDom.render(<App/>,rootElement);

console.log("hello world  !!");