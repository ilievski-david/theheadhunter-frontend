import React from "react";

const ColorsList = (list : any) => {
    return <div className="colors-list">
        <ul>
        {list.map((color : any) => {
            return <li className="color-item"></li>
        })}
        </ul>
    </div>;
    };

export default ColorsList;