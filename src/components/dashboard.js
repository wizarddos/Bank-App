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
    const [mostValuableStock, setMostValuableStock] = useState([]);

    useEffect(()=>{
        if(localStorage.getItem("loged") === false){
            history.push("/")
        }else{
            if( userData !== [] && mostValuableStock !== []){
                fetch(`http://localhost/bank-app/api/getUserData.php?id=${localStorage.getItem('id')}`)
                .then(response => response.json())
                .then(setUserData);
                
                fetch(`http://localhost/bank-app/api/getStock.php`)
                .then(response => response.json())
                .then(setMostValuableStock)
            }
            
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

    const getMostValueableUserStock = ()=>{ 
        if(userData.stocksLength > 0){
            let biggest = 0;
            let biggestObj = {};
            userData.stocks.forEach(el => {
                if(parseFloat(el.price) > biggest){
                    biggest = parseFloat(el.price);
                    biggestObj = el;
                }
            });
            return(
                <>
                    <h2>{lang[3].mostValuable}: <span className = "flashed">{biggestObj.brand}</span></h2>
                    <p>{lang[3].id}: {biggestObj.typeId+"-"+biggestObj.id}</p>
                    <p>{lang[3].val}: {biggestObj.price+lang[3].curr}</p>
                </>
            )
        }else{
            return(
                <>
                    <h2>{lang[3].noStocks}</h2>
                    <a href = "buy" className="link-success dashboard-link">{lang[3].buySomeStocks}</a>
                </>
            )
        }
    }

    const getMostValueableStockInDB = ()=>{

        
        if(mostValuableStock === []){
            return <h2>{lang[3].smthWentWrong}</h2>
        }else{
            return (
                <>
                
                    <h3>{lang[3].nowMost}<br/>{lang[3].valStock}: <span className = "flashed">{mostValuableStock.brand}</span></h3>
                </>
            )
        }
    }

    const generateDeposits = ()=>{
        if(userData.depositVal === null){
            
            return( 
                <>
                    <h2>{lang[3].noDeposit}</h2>
                    <a href = "openDeposit" className="link-success dashboard-link">{lang[3].openDeposit}</a>
                </>
            )
        }else{
            return(
                <>
                    <h2>{lang[3].yourDeposit}:<br/> {userData.depositVal} {userData.depositCurr}</h2>
                    <a href = "fundDeposit" className="link-success dashboard-link">{lang[3].transferFunds}</a>
                </>
            )
        }
    }

    return(
        <>
            <Header />
            <div className = "dashboard container">
                <div className = "dashboard-row">
                    <div className = "balance col ">
                        {generateBalance()}
                    </div>
                    <div className = "mostValuableUserstock col-6">
                        {getMostValueableUserStock()}
                    </div>
                </div>
                <div className = "dashboard-row">
                    <div className = "mostValuableStockInDB col-6">
                        {getMostValueableStockInDB()}
                    </div>
                    <div className = "usersDeposit col-6 ">
                        {generateDeposits()}
                    </div>
                </div>
            </div>
        </>
    )
}