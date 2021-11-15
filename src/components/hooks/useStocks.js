import react, { useState, useEffect } from "react";

export default function useUserStocks(){
    const [mostValuableStock, setMostValuableStock] = useState([]);
    useEffect(()=>{
        if(localStorage.getItem("loged") === false){
            return false
        }else{
            if(mostValuableStock !== []){
                
                fetch(`http://localhost/bank-app/api/getUserStocks.php?id=${localStorage.getItem('id')}`)
                .then(response => response.json())
                .then(setMostValuableStock)
            }
            
        }
    }, [])
    return mostValuableStock;
}
