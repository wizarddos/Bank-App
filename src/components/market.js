import "../styles/index.css";
import "../styles/markt.css";
import Header from "./template/header"
import { useState, useEffect } from "react"
import useLang from "./hooks/useLang";
import useBuyStockPath from "./hooks/useBuyStockPath";
import { useHistory } from "react-router";

export default function StockMarket(){

    const [stocksData, setStocks] = useState(null);
    const lang = useLang()

       useEffect(()=>{
            fetch(`http://localhost/bank-app/api/getAllStocks.php?id=${localStorage.getItem('id')}`)
            .then(response => response.json())
            .then(setStocks)
        }, [])

    useEffect(()=>{
        if(typeof stocksData !== Object){
            return <p>{lang[8].loading}</p>
        }
    },[ stocksData ])

    

    return (
        <>
            <Header />
            { stocksData ? <MarketUi stocks = { stocksData } />  : <h2 className = "loading">{lang[8].loading}</h2> }
        </>      
        
    )
    


}

export const MarketUi = ({ stocks })=>{
    const lang = useLang();
    const history = useHistory()

    const searchStocks = e =>{
        e.preventDefault()
        if(document.querySelector("#search").value){
            const url = "/search?search="+document.querySelector("#search").value
            history.push(url)
        }

        if(!document.querySelector("#search").value){
            document.querySelector('#error').innerHTML = "<p className = \"err\">Wpisz Nazwę fimy</p>"
        }
    }

    const link = ()=>{
        const unBuyedStocks = stocks.filter(el => el.belongs === "0")
        let biggest = 0;
        let biggestObj = {};
        unBuyedStocks.forEach(el => {
            if(parseFloat(el.price) > biggest){
                biggest = parseFloat(el.price);
                biggestObj = el;
            }
        });

        if(biggestObj.id){
            return (
                <>
                    <p>{biggestObj.brand}- {lang[8].price}{biggestObj.price}{lang[3].curr}</p>
                    <a className = "link-success" href = {`/buyStockPath?StockId=${biggestObj.id}`}>{lang[8].buyStock}</a>
                </>
            )
    
        }
    }

    return(
        <>
            <div className = "stocks">
                <div className = "markt-col">
                    <div>
                        <h2>{lang[8].mostValuableStock}</h2>
                        {link()}
                    </div>
                    <div className = "market-col-div">
                        <h2>{lang[8].lessValuableStock}</h2>
                        <p>{stocks.at(-1).brand}- {lang[8].price}{stocks.at(-1).price}{lang[3].curr}</p>
                    </div>
                </div>
                <div className = "markt-col markt-col-2">
                    <div>
                        <h2>{lang[8].search}</h2>
                        <form onSubmit = {searchStocks}>
                            <input type ="text" placeholder = {lang[8].search} className = "form-control" id = "search"/>
                            <br/>
                            <button type = "submit" className = "btn btn-success button">{lang[8].submit}</button>
                            <div id = "error" className = "err">

                            </div>
                        </form>
                    </div>
                    <div>

                    </div>
                </div>
            </div>
        </> 
    )
}