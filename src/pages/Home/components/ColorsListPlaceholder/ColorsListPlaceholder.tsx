import React from "react";
import ninjaIcon from '../../../../assets/ninja.svg';
import './ColorsListPlaceholder.css';

const ColorsListPlaceholder = () => {
    return <div>
        <div className="colors-list-placeholder">
        <div className="icon-box">
            <img className="ninja-icon" src={ninjaIcon} alt="ninja icon"/>
        </div>
        <h2 className="text-empty-collection">Your color collection is empty!</h2>
        <p className="text-please-add">Please add your favorite colors to make us happy.</p>
    </div>
    </div>
}

export default ColorsListPlaceholder;