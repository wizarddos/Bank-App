import React, { useState } from 'react'
import langJSON from './lang/pl.json'
import "../styles/welcome.css"
import "bootstrap"
import { useHistory } from 'react-router'

export default function Welcome() {
    const[lang, setLangData] = useState(JSON.parse(JSON.stringify(langJSON)))
    const history = useHistory()
    
    const redirectToForm = () =>{
        history.push("/")
    }
    
    return (
        <div className = "welcomeView">
            <h2>{lang[2].youHaveToLogIn}</h2>
            <button className = "btn btn-primary" onClick = {redirectToForm}>{lang[2].redirectToLogin}</button>
        </div>
    )
}
