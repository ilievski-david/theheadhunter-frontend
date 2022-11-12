import React, {useState, useEffect} from "react";
import "./Home.css"
import ColorPicker from "./components/ColorPicker/ColorPicker";
import AddButton from "./components/AddButton/AddButton";
import ColorsListPlaceholder from "./components/ColorsListPlaceholder/ColorsListPlaceholder";
import ColorsList from "./components/ColorsList/ColorsList";
import TokenManager from "../../auth/tokenManager";
import axios from "axios";
import Snackbar from "./components/Snackbar/Snackbar";
import { SERVER_URL } from "../../config";
// create a new component called Home
const Home = () => {
    // create new state called token

    const [token,setToken] = useState<string | null>(null);
    const [colors, setColors] = useState<any[] | null>(null);
    const [userInput,setUserInput] = useState<any>({name: "", hex: ""});
    const [snackbarMessage,setSnackbarMessage] = useState<string >("Error");
    let [listUpdated,setListUpdated] = useState<number>(0);
    useEffect(() => {
        let _token = TokenManager.loadToken();
        setToken(_token);
        getColors(_token);
        
    }, [])
    
    useEffect(() => {
        if(listUpdated != 0){
            getColors(token); 
        }
        
    }, [listUpdated])
   

    let getColors = (_token : string | null) => {
        if(!_token) {return null}
        axios({
            method: 'post',
            url: SERVER_URL + '/getColors',
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
            url: SERVER_URL + '/removeColor',
            data: {
                userToken: token,
                id: colorId,
            }
          })
        .then((response) => {
            setListUpdated(++listUpdated);
        }).catch((error) => {
            //console log status
            console.log(error.response.status);
            
        })
    }

    let addColor = (input : {name : string, hex : string}) => {
        axios({
            method: 'post',
            url: SERVER_URL + '/addColor',
            data: {
                userToken: token,
                hex: input.hex,
                name: input.name
            }
          })
        .then((response) => {
            setListUpdated(++listUpdated);
            console.log(response.status);
            response.status === 200 ? showSnackbar("Color added") : showSnackbar("Error");
        }).catch((error) => {
            showSnackbar(error.response.status.toString());
            console.log(error);
        })
    }

    let handleRemove = (id: any) => {
        removeColor(id);
        let update = listUpdated + 1;
        setListUpdated(++listUpdated);
        console.log("list updated", listUpdated);
        console.log(id)
    }

    let handleAdd = () => {
        console.log("clicked")
        addColor(userInput);
        console.log("list updated", listUpdated);
    }

    let handleInput = (input: any) => {
        setUserInput(input);
        console.log(userInput);
    }

    return (
        <div className="app-layout">
        <h1 className="title">My Favorite Colors</h1>
        <div className="color-form"> <ColorPicker callbackInput={handleInput.bind(this)}/> <AddButton callbackAdd={handleAdd.bind(this)}/> </div>
        <div className="colors-section">
            {colors === null ? <ColorsListPlaceholder/> : <ColorsList colors={colors} callbackRemove={handleRemove.bind(this)}/>}
        </div>
        <Snackbar message={snackbarMessage}/>
        </div>
    );
    };

export default Home;