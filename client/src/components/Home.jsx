import React, { useState } from "react";
import { useEffect } from "react";
import {useDispatch, useSelector} from "react-redux"
import { Link } from "react-router-dom";
import { filterCharactersByStatus, filterCreated, getCharacters, orderByName } from "../actions";
import Card from "./Card";
import Paginado from "./Paginado";
import SearchBar from "./SearchBar";

export default function Home() {
    const dispatch = useDispatch();
    const allCharacters = useSelector((state) => state.characters)
    const [order, setOrder] = useState("")
    const [currentPage, setCurrentPage] = useState(1);
    const [charactersPerPage, setCharactersPerPage] = useState(6);
    const indexOfLastCharacter = currentPage * charactersPerPage;
    const indexOfFirstCharacter = indexOfLastCharacter - charactersPerPage;
    const currentCharacters = allCharacters.slice(indexOfFirstCharacter, indexOfLastCharacter);

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
    }



    useEffect (() => {
        dispatch(getCharacters())
    },[dispatch])

    function handleClick(e) {
        e.preventDefault()
        dispatch(getCharacters());
    }

    function handleFilterStatus(e) {
        dispatch(filterCharactersByStatus(e.target.value))
    }

    function handleCreated(e) {
        dispatch(filterCreated(e.target.value))
    }

    function handleorderByName(e) {
        e.preventDefault()
        dispatch(orderByName(e.target.value))
        setCurrentPage(1)
        setOrder(`ordered${e.target.value}`)
    }


    return (
        <div>
            <Link to="/character"> Create character</Link>
            <h1>Breaking Bad App</h1>
            <button onClick={e => {handleClick(e)}}>Reset characters</button>
            <div>
                <select onChange={e => handleorderByName(e)}>
                    <option value="asc">Asc</option>
                    <option value="desc">Desc</option>
                </select>
                <select onChange={e => handleFilterStatus(e)}>
                    <option value="All">All</option>
                    <option value="Alive">Alive</option>
                    <option value="Deceased">Deceased</option>
                    <option value="Unknown">Unknown</option>
                    <option value="Presumed dead">Presumed dead</option>
                </select>
                <select onChange={e => handleCreated(e)}>
                    <option value="All">All</option>
                    <option value="created">created</option>
                    <option value="api">existent</option>
                </select>

                <Paginado 
                    charactersPerPage={charactersPerPage}
                    allCharacters={allCharacters.length}
                    paginado={paginado}
                />
                <SearchBar/>
                {currentCharacters?.map((c) => {
        return (
          <div>
            <Link to={"/home/" + c.id}>
              <Card name={c.name} image={c.img ? c.img : c.image} nickname={c.nickname}  key={c.id} />
            </Link>
          </div>
        );
            })} 
            </div>
        </div>
    )
}

