import React from "react";
import plusIcon from '../../../../assets/plus.svg';
import "./AddButton.css";

const AddButton = () => {
    return (
        <div className="add-button">
            <img src={plusIcon} alt= "add"/>
        </div>
        
    );
    };

export default AddButton;