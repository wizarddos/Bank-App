import react, { useState } from 'react';
import langJSON from "./lang/pl.json"
import bootstrap from 'bootstrap'
import '../styles/forms.css';




export default function LoginForm(){
    const[lang, setLangData] = useState(JSON.parse(JSON.stringify(langJSON)))
    const [id, setID] = useState("");
    const [idError, setIDError] = useState("");

    const [pass, setPass] = useState("");
    const [passError, setPassError] = useState("");

    const [showPassVal, showPassUpdate] = useState(false);


    const showPass = () => {
        showPassUpdate(!showPassVal);
    }
    
    const submitForm = e =>{
        e.preventDefault();
    }

    return(
        <div className = "Form">
            <h1>{lang[0].login}</h1>
            <br/>
            <form onSubmit = {submitForm} className ="needs-validation" id = "needs-validation"  novalidate>
                <label htmlFor = "personalID">{lang[0].id}</label>
                <input type = "number" placeholder = {lang[0].id} className = "form-control" id = "personalID" required/>
                <div className = "feedback-valid"></div>

                <label htmlFor = "password">{lang[0].pass}</label>
                <input type = {showPassVal ? "text" : "password"} id = "password" placeholder = {lang[0].pass} className = "form-control"  required/>

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