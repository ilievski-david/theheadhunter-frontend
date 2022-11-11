import React, {useState, useEffect} from "react";
import "./Home.css"
import ColorPicker from "./components/ColorPicker/ColorPicker";
import AddButton from "./components/AddButton/AddButton";
import ColorsListPlaceholder from "./components/ColorsListPlaceholder/ColorsListPlaceholder";
import ColorsList from "./components/ColorsList/ColorsList";
import TokenManager from "../../auth/tokenManager";
import axios from "axios";
// create a new component called Home
const Home = () => {
    // create new state called token

    const [token,setToken] = useState<string | null>(null);
    const [colors, setColors] = useState<any[]>([]);
    const [userInput,setUserInput] = useState<any>({name: "", hex: ""});
    useEffect(() => {
        setToken(TokenManager.loadToken());
        }, [token])

   

    

    // get colors from getColors function in useEffect
    useEffect(() => {
        getColors();
    }, [])


    let getColors = () => {
        axios({
            method: 'post',
            url: 'http://localhost:8080/getColors',
            data: {
                userToken: token,
            }
          })
        .then((response) => {
            let colors = response.data;
            setColors(JSON.parse(colors))
            console.log("colors from server", colors.length);
        }).catch((error) => {
            console.log(error);
        })
        
    }

    let addColor = (input : {name : string, hex : string}) => {
        axios({
            method: 'post',
            url: 'http://localhost:8080/addColor',
            data: {
                userToken: token,
                hex: input.hex,
                name: input.name
            }
          })
        .then((response) => {
            let colors = response.data;
            //setColors(colors)
            console.log("colors from server", colors);
        }).catch((error) => {
            console.log(error);
        })
    }

    let handleRemove = (id: any) => {
        console.log(id)
    }

    let handleAdd = () => {
        console.log("clicked")
        addColor(userInput);
        getColors()
    }

    let handleInput = (input: any) => {
        setUserInput(input);
        console.log(input);
        console.log(userInput);
    }

    return (
        <div className="app-layout">
        <h1 className="title">My Favorite Colors</h1>
        <div className="color-form"> <ColorPicker callbackInput={handleInput}/> <AddButton callbackAdd={handleAdd}/> </div>
        <div className="colors-section">
            {colors.length === 0 ? <ColorsListPlaceholder/> : <ColorsList colors={colors} callbackRemove={handleRemove}/>}
          
        </div>
        </div>
    );
    };

export default Home;