import axios from "axios"
import { SERVER_URL } from "../config"
import ColorInterface from "../models/ColorInterface";
import InputInterface from "../models/InputInterface";
class BasicOps {

    static fetchColors = async (token : string | null) : Promise<ColorInterface[] | null> => {
        if(!token) { throw new Error('Token is null'); }
        let res =  await axios({
            method: 'get',
            url: SERVER_URL + '/getColors/' + token,
          });
        return res.data;
    }

    static addColor = async (token : string | null, input :InputInterface) : Promise<any> => {
        if(!token) { throw new Error('Token is null'); }
        let res = await axios({
            method: 'post',
            url: SERVER_URL + '/addColor',
            data: {
                userToken: token,
                hex: input.hex,
                name: input.name
            }
          })

          return res;
    }

    static removeColor = async (token : string | null, colorId : number) : Promise<any> => {
        if(!token) { throw new Error('Token is null'); }
        let res = await axios.delete(SERVER_URL + '/removeColor', {
            data: {
                userToken: token,
                id: colorId,
                }})

          return res;
    }
}

export default BasicOps