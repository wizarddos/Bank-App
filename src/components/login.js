import react, { useContext, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import langJSON from "./lang/pl.json"
import { AppContext } from "../index";
import bootstrap from 'bootstrap'
import "bootstrap"
import '../styles/forms.css';
import { Redirect, useHistory } from 'react-router';




export default function LoginForm(){
    const  context  = useContext(AppContext)
    const[lang, setLangData] = useState(JSON.parse(JSON.stringify(langJSON)))
    
    const [answer, setAnswer] = useState([])

    const [error, setError] = useState("");

    const [showPassVal, showPassUpdate] = useState(false);

    const history = useHistory();


    const showPass = () => {
        showPassUpdate(!showPassVal);
    }
    
    const submitForm = e =>{
        e.preventDefault();
        let email = document.querySelector("#email").value;
        let pass = document.querySelector("#password").value;

        const jsonData = {
            "userEmail": email,
            "password": pass
        }

        const requestOptions = {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(jsonData)
        }

        fetch(`http://localhost/bank-app/api/login.php`, requestOptions)
            .then(request => request.json())
            .then(setAnswer)
            .then(console.log)
            .then(redirectToPage)
            
    }

    useEffect(()=>{
        setAnswer([]);
    }, [])

    const redirectToPage = ()=>{
        
        const answerObj = JSON.parse(JSON.stringify(answer))
        if(answerObj.isOk === 1 && answerObj !== []){
            if(answerObj.emailErr === 1){setError(lang[0].invalidData)}
            if(answerObj.passErr === 1){setError(lang[0].invalidData)}
        }else{
            localStorage.setItem("loged", true) 
            localStorage.setItem("id", answerObj.id)
            if(answerObj.isAdmin === 0){
                return history.push("/dashboard")
            }else if( answerObj.isAdmin === 1){
                return history.push("/admin")
            }
        }
    }

    return(
        <div className = "Form">
            <h1>{lang[0].login}</h1>
            <br/>
            <form onSubmit = {submitForm} className ="needs-validation" id = "needs-validation"  novalidate>
                <label htmlFor = "email">{lang[0].email}</label>
                <input type = "email" placeholder = {lang[0].email} className = "form-control" id = "email" required/>

                <label htmlFor = "password">{lang[0].pass}</label>
                <input type = {showPassVal ? "text" : "password"} id = "password" placeholder = {lang[0].pass} className = "form-control"  required/>
                <div className = "err">{error}</div>

                <div class="form-check">
                    <input class="form-check-input" type="checkbox" onChange = {showPass} id="invalidCheck"/>
                    <label class="form-check-label" htmlFor="invalidCheck">
                        {lang[0].showPass}
                    </label>
                </div>

                <br/><br/>
                <button className = "btn btn-primary">{lang[0].login}</button>
            
                <p className = "registerLink"><br/>{lang[0].register} <br/><a href = "/register">{lang[0].registerLink}</a></p>
            </form>
        </div>
    )

}