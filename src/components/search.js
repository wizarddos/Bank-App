import { useEffect, useState } from "react"
import { useHistory } from "react-router";
import useBuyStockPath from "./hooks/useBuyStockPath";
import useLang from "./hooks/useLang";
import Header from "./template/header";
import "../styles/searched.css"

export default function SearchMarket(){
    const [searchedStocks, setSeacrhResult] = useState()
    const lang = useLang()
    
    useEffect(() => {
        var url_string = window.location.href
        var url = new URL(url_string);
        var searchedValue = url.searchParams.get("search");
        fetch(`http://localhost/bank-app/api/search.php?searched=${searchedValue}`)
        .then(response => response.json())
        .then(setSeacrhResult)


    },[])
    return(
        <div className = "searched">
            <Header />
            {searchedStocks ? <SearchMarketUi searched = {searchedStocks}/> : <h2>{lang[8].loading}</h2> }
        </div>
    )
}

export function SearchMarketUi({ searched }){
    const lang = useLang()
    const history = useHistory()
    const result = searched;
    

    return(
        <>
            <h2>{lang[9].results}</h2>
            {
               result.length ? <Results resultsArr = {result}/> : <p>{lang[9].noResults}</p>
            }
        </>
    )
}

export function Results({ resultsArr }){
    const lang = useLang()
    const buyStockPath = '/buyStockPath?StockId=';
    return(
        <>
            {
                resultsArr.map((stock, key)=>
                    <div className = "stockSearched" key = {key}>
                        <p>
                            {stock.typeId}-{stock.id}: {stock.name} - {stock.price}{lang[3].curr} &nbsp;
                            <a href = {buyStockPath+stock.id} className="link-success">{lang[9].buyStock}</a>
                        </p>
                    </div>
                )
            }
        </>
    )
}