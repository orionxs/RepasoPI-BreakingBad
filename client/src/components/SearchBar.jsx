import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getNameCharacters } from "../actions/index";

export default function SearchBar () {
    const dispatch = useDispatch()
    const [name, setName] = useState("")

    function handleInputChange(e) {
        e.preventDefault(e)
        setName(e.target.value)
        console.log(name)
    }

    function handleSubmit(e) {
        e.preventDefault(e)
        dispatch(getNameCharacters(name))
        setName("")
    }

    return (
        <div>
            <input
            type = "text"
            placeholder= "Search..."
            onChange = {(e) => handleInputChange(e)}
            />
            <button type="submit" onClick={e => handleSubmit(e)}>Buscar</button>
            
        </div>
    )
}