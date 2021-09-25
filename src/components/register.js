import react, {useEffect, useState} from "react";
import langJSON from "./lang/pl.json"
import bootstrap from 'bootstrap'
import '../styles/forms.css';
import { Redirect, useHistory } from "react-router";

export default function RegisterForm(){
    const[lang, setLangData] = useState(JSON.parse(JSON.stringify(langJSON)))
    const [showPassVal, showPassUpdate] = useState(false);

    const [answer, setAnswer] = useState([]);
    const history = useHistory();

    const [emailErr, setEmailErr] = useState("");
    const [passErr, setPassErr ]= useState("");
    const [tosErr, setTosErr ] = useState("");
    const [servErr, setServErr] = useState("");


    const showPass = () => {
        showPassUpdate(!showPassVal);
    }
    
    const submitForm = e=>{
        e.preventDefault();
        const tos = document.querySelector('#tos').value ? true : false;
        const json = {
            email: document.querySelector("#email").value,
            pass: document.querySelector('#password').value,
            pass2: document.querySelector('#password2').value,
            tos: tos
        }


        fetch(`http://localhost/bank-app/api/register.php?jsonReq=${JSON.stringify(json)}`)
        .then(response => response.json())
        .then(setAnswer)
        .catch(console.error)

    }


    useEffect(()=>{
        const answerObj = JSON.parse(JSON.stringify(answer));
        if(answerObj.isok === 1){
            if(answerObj.emailErr === 1){ setEmailErr(lang[1].invalidMail )}
            if(answerObj.emailErr === 2){ setEmailErr(lang[1].emailTaken) }

            if(answerObj.passErr === 1){ setPassErr(lang[1].tooShort) }
            if(answerObj.passErr === 2){ setPassErr(lang[1].dontMatch) }

            if(answerObj.tosErr === 1){ setTosErr(lang[1].agreeTos) }
            
            if(answerObj.serverErr === 1){ setServErr(lang[1].servErr) }
            
        }else{
            return history.push("/welcome")
        }

    })
    
    return(
        <div className = "Form">
            <h1>{lang[1].register}</h1>
            <br/>
            <form onSubmit = {submitForm} className ="needs-validation" id = "needs-validation"  novalidate>
                <label htmlFor = "email">{lang[1].email}</label>
                <input type = "email" id = "email" className = "form-control" placeholder = {lang[1].email} required/>
                <p className="err">{emailErr}</p>
                    
                <br/>

                <label htmlFor = "password">{lang[1].pass}</label>
                <input type = {showPassVal ? "text" : "password"} id = "password" placeholder = {lang[1].pass} className = "form-control"  required/>
                <br/>

                <label htmlFor = "password2">{lang[1].passRepeat}</label>
                <input type = {showPassVal ? "text" : "password"} id = "password2" placeholder = {lang[1].passRepeat} className = "form-control"  required/>

                <div class="form-check">
                    <input class="form-check-input" type="checkbox" onChange = {showPass} id="invalidCheck"/>
                    <label class="form-check-label" htmlFor="invalidCheck">
                        {lang[1].showPass}
                    </label>
                </div>
                <p className = "err">{passErr}</p>
                <br/>

                <div class="form-check">
                    <input class="form-check-input" type="checkbox" id="tos" required/>
                    <label class="form-check-label" htmlFor="tos">
                        {lang[1].tos}
                    </label>
                </div>
                <p className = "err">{tosErr}</p>

                <div class="d-grid gap-2">
                    <button class="btn btn-primary" type="submit">{lang[1].register}</button>
                    
                </div>
                <p className = "err">{servErr}</p>
                
            </form>
        </div>
    )
}