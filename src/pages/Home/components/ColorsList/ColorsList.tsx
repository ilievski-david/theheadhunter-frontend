import React from "react";
import "./ColorsList.css";
const ColorsList = ({colors, callbackRemove} : {colors : any, callbackRemove : any}) => {
    

    let handleClick = (id : any) => {
        callbackRemove(id);
    }

    return <div className="colors-section">
        <h2 className="text-color-collection">Color collection</h2>
        <ul className="colors-list disable-scrollbars">
            {colors.map((color: any) => {
                const myComponentStyle = {
                    background: color.hex,
                }
                return <li key={color.id} className="color-item">
                    <div className="color-box" style={myComponentStyle}> </div>
                    <div className="color-name">{color.name}</div>
                    <div className="color-remove" onClick={() => {handleClick(color.ID)}}>Remove color</div>
                </li>
            })}
        </ul>

    </div>

};

export default ColorsList;