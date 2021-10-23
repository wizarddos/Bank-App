import react from "react";
import "../../styles/header.css"

export default function Header(){
    return(
        <div className = "header">
            <i className =" headerIco fas fa-home"></i>
            <i className =" headerIco fas fa-wallet"></i>
            <i className =" headerIco fas fa-chart-line"></i>
            <i className =" headerIco fas fa-user-cog"></i>
        </div>
    )
}