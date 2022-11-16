import React from "react";
import "./ColorsList.css";
import ColorInterface from "../../../../models/ColorInterface";
const ColorsList = ({colors, callbackRemove} : {colors : ColorInterface[], callbackRemove : (a: number) => void}) => {
    

    return <div className="colors-section">
        <h2 className="text-color-collection">Color collection</h2>
        <ul className="colors-list scrlbr">
            {colors.map((color: any) => {
                const myComponentStyle = {
                    background: color.hex,
                }
                return <li key={color.ID} className="color-item">
                    <div className="color-box" style={myComponentStyle}> </div>
                    <div className="color-name">{color.name}</div>
                    <div className="color-remove" onClick={() => {callbackRemove(color.ID)}}>Remove color</div>
                </li>
            })}
        </ul>

    </div>

};

export default ColorsList;