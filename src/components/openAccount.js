import react, { useEffect, useState } from 'react';
import langJSON from "./lang/pl.json"
import Header from './template/header';
import '../styles/index.css'
import '../styles/open.css'
import { useHistory } from 'react-router';


export default function OpenAccount(){
    const [lang, setLangData] = useState(JSON.parse(JSON.stringify(langJSON)));
    const [acc, setAcc] = useState("");
    const [responseState, setResponseState] = useState("")
    const history = useHistory();

    useEffect(async ()=>{
        await fetch(`http://localhost/bank-app/api/getAccount.php?id=${localStorage.getItem('id')}`)
        .then(response => response.json())
        .then(setAcc)
    },[])

    useEffect(()=>{
        if(acc.isAccount){
            alert(lang[4].youHaveAcc);
            history.push("/dashboard");
        }
    }, [acc])

    const openAccount = e =>{
        e.preventDefault();
        let currCode = document.querySelector('#currency').value;

        fetch(`http://localhost/bank-app/api/openAccount.php?currency=${currCode}&id=${localStorage.getItem('id')}`)
        .then(response => response.json())
        .then(setResponseState)

        if(responseState.serverErr === 1){
            document.querySelector('#err').innerHTML = lang[4].somethingWentWrong;
            return 0;
        }

        if(responseState.serverErr === 0){
            if(responseState.currencyErr){
                document.querySelector('#err').innerHTML = lang[4].badCurrency;
            }

            if(responseState.currErr !== 1){
                history.push('/dashboard');
                console.log("push")
                return 0;
            }
        }
    }

    return(
        <>
            <Header />
            <div className = "centred openAccountDiv">
                <form className = "openAccountForm centred" onSubmit = {openAccount}>
                    <h2>{lang[4].Header}</h2>
                    <label className = "centred ">{lang[4].chooseCurr}<br/>
                    <input list="currency" maxLength = "3" className = "form-control" id = "currency" name="currency" placeholder = {lang[4].chooseCurr} /></label>
                    <datalist id="currency" className = "centred">
                        <option value="PLN" />
                        <option value="USD" />
                        <option value="EUR" />
                        <option value="JPY" />
                        <option value="CHF" />
                        <option value="GBP" />
                    </datalist>
                    <button className = "btn btn-success button">{lang[4].openAccount}</button>
                    <div id = "err">

                    </div>
                </form>
            </div>
        </>
    )
}