import axios from "axios";
import { useEffect, useState } from "react";
import { BACKRND_URL } from "../config";

export function useContent(){

    const [contents , setContents] = useState([]);

    function refress() {

        axios.get(BACKRND_URL + "/api/v1/content" ,{
            headers : {
            "Authorization" : localStorage.getItem("token")
            }
        }).then((response) => {
            setContents(response.data.content)
        })
        
    }
    useEffect(() => {
        refress()

    let interval =  setInterval(() => {
            refress()  
        } , 10 * 1000)

        return () => {
            clearInterval(interval);
        }

    },[])

    return {contents ,refress}
}