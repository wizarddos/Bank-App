import useLang from "./hooks/useLang";
import Header from "./template/header";
import { useEffect, useState } from "react";
import "../styles/buyStock.css"
import { useHistory } from "react-router";

export default function BuyStock(){
    const lang = useLang();
    const [ stockData, setStock] = useState()

    useEffect(() => {
        const url_string = window.location.href
        const url = new URL(url_string);
        const stockId = url.searchParams.get("StockId");
        fetch(`http://localhost/bank-app/api/getStockToBuy.php?stockId=${stockId}`)
        .then(res => res.json())
        .then(setStock)
    }, [])


    return(
        <>
            <Header />
            {stockData ? <BuyStockUI stock = {stockData} /> : <p>{lang[8].loading}</p> }
        </>
    )
}

export function BuyStockUI({ stock }){
    const lang = useLang();
    const [postResponse, setResponse] = useState();
    const history = useHistory();

    const confirmBuying = e =>{
        e.preventDefault();
        fetch(`http://localhost/bank-app/api/buyStockConfirmed.php?stockID=${stock.id}&userID=${localStorage.getItem('id')}`)
            .then(response => response.json())
            .then(setResponse);
    }

    useEffect(()=>{
        if(typeof postResponse === "object" ){
            if(postResponse.updated == true){
                console.log("git")
                alert(lang[10].addedSuccess)
                history.push("/dashboard")
            }else{
                alert(lang[10].addedFail)
                history.push("/dashboard")
            }
        }
        
    }, [postResponse])

    return(
        <>
            
            <div className = "buyStock">
                <h2>{lang[10].youAreBuying}{stock.typeId}-{stock.id}</h2>
                <p>{lang[10].price}: {stock.price}{lang[3].curr}</p>
                <form onSubmit = {confirmBuying}>
                    <button type = "submit" className = "buyStockBtn btn btn-success">{lang[10].buyStock}</button>
                </form>
            </div>
        </>
    )
}
