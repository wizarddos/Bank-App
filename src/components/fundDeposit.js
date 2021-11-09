import react, { useEffect, useState } from 'react';
import langJSON from "./lang/pl.json"
import Header from './template/header';
import '../styles/index.css'
import '../styles/open.css'
import { useHistory } from 'react-router';


export default function FundDeposit(){
    const [lang, setLangData] = useState(JSON.parse(JSON.stringify(langJSON)));
    const [acc, setAcc] = useState("");
    const [responseState, setResponseState] = useState("")
    const history = useHistory();

    useEffect(async ()=>{
        await fetch(`http://localhost/bank-app/api/getDeposit.php?id=${localStorage.getItem('id')}`)
        .then(response => response.json())
        .then(setAcc)
    },[])

    useEffect(()=>{
        if(acc.isAccount === false){
            alert(lang[6].youdontHaveDep);
            history.push("/dashboard");
        }
    }, [acc])

    const openAccount = e =>{
        e.preventDefault();
        let value = document.querySelector('#value').value;

        fetch(`http://localhost/bank-app/api/fundDeposit.php?id=${localStorage.getItem('id')}&value=${value}`)
        .then(response => response.json())
        .then(setResponseState)

       
    }

    useEffect(()=>{
        if(responseState.serverErr === 1){
            document.querySelector('#err').innerHTML = lang[4].somethingWentWrong;
            return 0;
        }

        if(responseState.serverErr === 0){

            if(responseState.moneyErr === 0){
                history.push('/dashboard');
                console.log("push")
                return 0;
            }
        }
    }, [responseState])

    return(
        <>
            <Header />
            <div className = "centred openAccountDiv">
                <form className = "openAccountForm centred" onSubmit = {openAccount}>
                    <h2>{lang[6].sendToDeposit}</h2>
                    <label className = "centred ">{lang[5].chooseValue}<br/>
                    <input id = "value" className = "form-control" placeholder = {lang[5].chooseValuePlaceholder} /><br/><br/></label>
                  
                    <button className = "btn btn-success button">{lang[4].openAccount}</button>
                    <div id = "err">

                    </div>
                </form>
            </div>
        </>
    )
}