import React from "react";
import "./Snackbar.css";

const Snackbar = ({message} : {message : string}) => {
    return (
            <div id="snackbar">{message}</div>
    );
};

export default Snackbar;