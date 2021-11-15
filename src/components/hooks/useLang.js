import pl from "../lang/pl.json";
import en from "../lang/en.json";
import react, { useState } from "react";

export default function useLang(){
    const [language, setLang] =  useState(JSON.parse(JSON.stringify(pl)))
    return language;
}