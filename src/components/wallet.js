import react, { useEffect, useState } from "react";
import Header from "./template/header";
import useUserData from "./hooks/useUserData"
import useLang from "./hooks/useLang"
import useUserStocks from "./hooks/useStocks"


import "../styles/wallet.css"


export default function Wallet(){

    const userData = useUserData();
    const userStocks = useUserStocks()
    const lang = useLang();


    const displayStocks = ()=>{
        //console.log(userData.stocks.map(()=>{}))
        if(userStocks){
            
        }else{
            console.log("hello")
        }
        //
    }

    return(
        <>
            <Header />
            <div className = "title">
                <h2>{lang[7].wallet}</h2>
            </div>
            <div className = "wallet">
                
                <div className = "wallet-col">
                    <div className = "balance-div">
                        <h2>{lang[3].balance}: {userData.balance}{lang[3].curr}</h2>
                    </div>
                    <div className = "fund-div">
                        <h2>{userData.depositID ? lang[3].yourDeposit+": "+userData.depositVal+" "+userData.depositCurr : lang[3].noDeposit}</h2>
                    </div>
                </div>
                <div className = "wallet-col">
                    <h2>{lang[7].yourStocks}</h2>
                    {
                        userStocks.map((stock) =>{
                            return <Stock id = {stock.id} typeId = {stock.typeId} brand = {stock.brand} price = {stock.price}/>
                        })
                    }
                </div>
            </div>
        </>
    )
}


export function Stock({ id, typeId, brand, price}){
    const lang = useLang();

    return(
        <div className = "stock">
            <p>{brand} ({typeId+"-"+id}) - {lang[7].stockPrice}: {price}{lang[3].curr}</p>
        </div>
    )
}