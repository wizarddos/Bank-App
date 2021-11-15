import react from "react";
import "../../styles/header.css"

export default function Header(){
    return(
        <div className = "header">
            <a href = "/dashboard"><i className =" headerIco fas fa-home"></i></a>
            <a href = "/wallet"><i className =" headerIco fas fa-wallet"></i></a>
            <i className =" headerIco fas fa-chart-line"></i>
            <i className =" headerIco fas fa-user-cog"></i>
        </div>
    )
}