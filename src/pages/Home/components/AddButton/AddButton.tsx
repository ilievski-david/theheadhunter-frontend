import React from "react";
import plusIcon from '../../../../assets/plus.svg';
import "./AddButton.css";

const AddButton = ({callbackAdd} : {callbackAdd : any}) => {
    return (
        <div className="add-button" onClick={callbackAdd}>
            <img src={plusIcon} alt= "add"/>
        </div>
        
    );
    };

export default AddButton;