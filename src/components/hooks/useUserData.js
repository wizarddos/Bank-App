import react, { useState, useEffect } from 'react'

export default function useUserData(){
    const [userData, setUserData] = useState([]);
    
    useEffect(()=>{
        if(localStorage.getItem("loged") === false){
            return false
        }else{
            if( userData !== []){
                fetch(`http://localhost/bank-app/api/getUserData.php?id=${localStorage.getItem('id')}`)
                .then(response => response.json())
                .then(setUserData)
            } 
        }
    }, [])

    return userData;
}


