import react, { useEffect, useState } from 'react';
import langJSON from "./lang/pl.json"
import Header from './template/header';
import '../styles/index.css'
import { useHistory } from 'react-router';


export default function OpenAccount(){
    const [lang, setLangData] = useState(JSON.parse(JSON.stringify(langJSON)));
    const [acc, setAcc] = useState("");
    const history = useHistory();

    useEffect(()=>{
        fetch(`http://localhost/bank-app/api/getAccount.php?id=${localStorage.getItem('id')}`)
        .then(response => response.json())
        .then(setAcc)

        if(acc.isAccount === true){
            alert(lang[4].youHaveAcc);
            history.push("/dashboard");
        }
    },[])

    return(
        <>
            <Header />
            <div className = "centred">
                <h2></h2>
                {/*TODO: Dopisać cały formularz tworzenia*/}
            </div>
        </>
    )
}