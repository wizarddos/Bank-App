import { useContext, useEffect } from "react"
import { useHistory } from "react-router";
import { AppContext } from "../index";
import langJSON from "./lang/pl.json"

export default function Dashboard(){
    const context = useContext(AppContext);
    const history = useHistory()

    useEffect(()=>{
        if(context.loged === false){
            history.push("/")
        }
    },[])
    return(
        //TODO: Okodować komponent DashBoard
        <>
            
        </>
    )
}