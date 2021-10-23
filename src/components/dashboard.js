import { useContext, useEffect, useState } from "react"
import { useHistory } from "react-router";
import { AppContext } from "../index";
import langJSON from "./lang/pl.json"

import Header from "./template/header";
import "../styles/dashboard.css"

export default function Dashboard(){
    const context = useContext(AppContext);
    const history = useHistory();
    const[lang, setLangData] = useState(JSON.parse(JSON.stringify(langJSON)));

    const [userData, setUserData] = useState([]);
    const [stockData, setStockData] = useState([]);
    const [mostValuableStock, setMostValuableStock] = useState([]);
    const [newses, setNewses] = useState([]);

    useEffect(()=>{
        if(localStorage.getItem("loged") === false){
            history.push("/")
        }else{
            fetch(`http://localhost/bank-app/api/getUserData.php?id=${localStorage.getItem('id')}`)
            .then(response => response.json())
            .then(setUserData)
            .then(console.log)
            

        }
    },[])

    const generateBalance = ()=>{
        if(userData.balance !== null){
            return(
                <>
                    <h2>{lang[3].welcomeBack}</h2>
                    <p>{lang[3].balance+": "+userData.balance}</p>
                </>
            )
        }else{
            return(
                <>
                    <h2>{lang[3].noAcc}</h2>
                    <a href = "open" className="link-success dashboard-link">{lang[3].open}</a>
                </>
            )
        }
    }

    const getMostValueableStock = ()=>{ 
        if(userData.stocksLength > 0){
            /*W tym miejscu należy dopisac logikę pobierającą z obiektu 
            userData wszystko na temat akcji i wybierający tę największą */
            console.log(userData);
        }else{
            return(
                <>
                    <h2>{lang[3].noStocks}</h2>
                    <a href = "buy" className="link-success dashboard-link">{lang[3].buySomeStocks}</a>
                </>
            )
        }
    }

    
    return(
        <>
            <Header />
            <div className = "dashboard container">
                <div className = "dashboard-row row">
                    <div className = "balance col">
                        {generateBalance()}
                    </div>
                    <div className = "mostValuablestock col">
                        {getMostValueableStock()}
                    </div>
                </div>
                <div className = "dashboard-row row">
                    <div className = "stockGoingUp col"></div>
                    <div className = "stockGoingDown col "></div>
                </div>
            </div>
        </>
    )
}