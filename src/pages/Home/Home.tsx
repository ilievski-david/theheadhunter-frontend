import React, {useState, useEffect} from "react";
import "./Home.css"
import ColorPicker from "./components/ColorPicker/ColorPicker";
import AddButton from "./components/AddButton/AddButton";
import ColorsListPlaceholder from "./components/ColorsListPlaceholder/ColorsListPlaceholder";
import ColorsList from "./components/ColorsList/ColorsList";
import TokenManager from "../../auth/tokenManager";
import axios from "axios";
import Snackbar from "./components/Snackbar/Snackbar";
// create a new component called Home
const Home = () => {
    // create new state called token

    const [token,setToken] = useState<string | null>(null);
    const [colors, setColors] = useState<any[] | null>(null);
    const [userInput,setUserInput] = useState<any>({name: "", hex: ""});
    const [snackbarMessage,setSnackbarMessage] = useState<string >("Error");
    useEffect(() => {
        let _token = TokenManager.loadToken();
        setToken(_token);
        getColors(_token);
        
    }, [])
   

    let getColors = (_token : string | null) => {
        if(!_token) {return null}
        axios({
            method: 'post',
            url: 'http://localhost:8080/getColors',
            data: {
                userToken: _token,
            }
          })
        .then((response) => {
            let colors_res = response.data;
            setColors(colors_res)
            console.log("token", token);
            console.log("colors from server", colors_res);
        }).catch((error) => {
            console.log(error);
        })
        
    }

    let showSnackbar = (message : string) => {
        setSnackbarMessage(message);
        let x = document.getElementById("snackbar");
        if(!x){return null}
        x.className = "show";
        setTimeout(function(){ 
            if(!x){return null}
            x.className = x.className.replace("show", ""); },
            3000);
    }

    let removeColor = (colorId : number) => {
        axios({
            method: 'delete',
            url: 'http://localhost:8080/removeColor',
            data: {
                userToken: token,
                id: colorId,
            }
          })
        .then((response) => {
            
        }).catch((error) => {
            //console log status
            console.log(error.response.status);
            
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
            console.log(response.status);
            response.status === 200 ? showSnackbar("Color added") : showSnackbar("Error");
        }).catch((error) => {
            showSnackbar(error.response.status.toString());
            console.log(error);
        })
    }

    let handleRemove = (id: any) => {
        removeColor(id);
        getColors(token)
        console.log(id)
    }

    let handleAdd = () => {
        console.log("clicked")
        addColor(userInput);
        getColors(token)
        
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
            {colors === null ? <ColorsListPlaceholder/> : <ColorsList colors={colors} callbackRemove={handleRemove}/>}
        </div>
        <Snackbar message={snackbarMessage}/>
        </div>
    );
    };

export default Home;