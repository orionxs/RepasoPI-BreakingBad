import React from "react";
import { useEffect } from "react";
import {useDispatch, useSelector} from "react-redux"
import { Link } from "react-router-dom";
import { getCharacters } from "../actions";
import Card from "./Card";

export default function Home() {
    const dispatch = useDispatch();
    const allCharacters = useSelector((state) => state.characters)

    useEffect (() => {
        dispatch(getCharacters())
    },[dispatch])

    function handleClick(e) {
        e.preventDefault()
        dispatch(getCharacters());
    }

    return (
        <div>
            <Link to="/character"> Create character</Link>
            <h1>Breaking Bad App</h1>
            <button onClick={e => {handleClick(e)}}>Reset characters</button>
            <div>
                <select>
                    <option value="asc">Asc</option>
                    <option value="desc">Desc</option>
                </select>
                <select>
                    <option value="All">All</option>
                    <option value="Alive">Alive</option>
                    <option value="Deceased">Deceased</option>
                    <option value="Unknown">Unknown</option>
                    <option value="Presumed dead">Presumed dead</option>
                </select>
                <select>
                    <option value="All">All</option>
                    <option value="created">created</option>
                    <option value="api">existent</option>
                </select>
                {
                    allCharacters && allCharacters.map((el) => (
                     <Card name={el.name} image={el.image} nickname={el.nickname} />
                    ))
                }
            </div>
        </div>
    )
}

