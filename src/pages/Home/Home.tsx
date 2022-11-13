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
import InputInterface from "../../models/InputInterface";
import ColorInterface from "../../models/ColorInterface";
import BasicOps from "../../api/BasicOps";
// create a new component called Home
const Home = () => {
    // create new state called token

    const [token,setToken] = useState<string | null>(null);
    const [colors, setColors] = useState<ColorInterface[] | null>(null);
    const [userInput,setUserInput] = useState<InputInterface>({name: "", hex: ""});
    const [snackbarMessage,setSnackbarMessage] = useState<string >("Error");
    let [listUpdated,setListUpdated] = useState<number>(0);
    useEffect(() => {
        let _token = TokenManager.loadToken();
        setToken(_token);
        BasicOps.fetchColors(_token).then((res) => {
            setColors(res);
        }).catch((error) => {
            console.log(error);
            
        })
        
    }, [])
    
    useEffect(() => {
        if(listUpdated != 0){
            BasicOps.fetchColors(token).then((res) => {
                setColors(res);
            }).catch((error) => {
                console.log(error);
                
            })

        }
        
    }, [listUpdated])
   


    let showSnackbar = (message : string, isError : boolean) => {
        setSnackbarMessage(message);
        let x = document.getElementById("snackbar");
        if(!x){return null}
        x.className = "show background-green";
        if(isError){
            x.className = "show background-red";
        }
        setTimeout(function(){ 
            if(!x){return null}
            x.className = x.className = ""},
            3000);
    }

   

   

    let handleRemove = (id: number) => {
        console.log(id)
        BasicOps.removeColor(token, id)
        .then((response) => {
            setListUpdated(++listUpdated);
        }).catch((error) => {
            //console log status
            console.log(error.response.status);
            
        })
        console.log("list updated", listUpdated);
        console.log(id)
    }

    let handleAdd = () => {
        console.log("clicked")
        BasicOps.addColor(token, userInput)
        .then((response) => {
            setListUpdated(++listUpdated);
            console.log(response.status);
            response.status === 200 ? showSnackbar("Color added", false) : showSnackbar("Error", true);
        }).catch((error) => {
            console.log(error);
            switch(error.response.status){
                case 402:
                    showSnackbar("Most have color name", true);
                    break;
                case 403:
                    showSnackbar("Color name needs to be less than 20 characters", true);
                    break;
                case 404:
                    showSnackbar("App error", true);
                    break;
                case 405:
                    showSnackbar("Must have a unique color name", true);
                    break;
                case 406:
                    showSnackbar("Color already exists", true);
                    break;
            }
        })
        console.log("list updated", listUpdated);
    }

    let handleInput = (input: InputInterface) => {
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