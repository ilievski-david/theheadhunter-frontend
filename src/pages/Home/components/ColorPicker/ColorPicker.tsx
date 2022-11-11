import React , {useState} from "react";
import "./ColorPicker.css";
import heartIcon from '../../../../assets/heart.svg';

const ColorPicker = ({callbackInput} : {callbackInput : any}) => {
  const [name,setName] = useState("Color name");
  const [color, setColor] = useState("#8F00FF");

  let onChangeName = (e: React.FormEvent<HTMLInputElement>): void => {
    setName(e.currentTarget.value);
    callbackInput({name: e.currentTarget.value, hex: color});
  };
  let onChangeColor = (e: React.FormEvent<HTMLInputElement>): void => {
    setColor(e.currentTarget.value);
    callbackInput({name: name, hex: e.currentTarget.value});
  }

  return (
    <div className="color-picker">
      <img className="heart-icon" src={heartIcon} alt="heart icon"/>
      <input className="name-input" type="text" placeholder={name} onChange={onChangeName}/>
      <input className="color-input" type="color" value={color} onChange={onChangeColor}/>
    </div>
  );
};

export default ColorPicker;