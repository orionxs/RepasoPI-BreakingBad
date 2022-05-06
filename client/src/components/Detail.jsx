import React from "react";
import { Link, useParams} from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../actions/index";
import { useEffect } from "react";

export default function Detail(props){
    console.log(props)

    const dispatch = useDispatch()

    const {id} = useParams()

    useEffect(() => {
        dispatch(getDetail(id))
    },[dispatch, id])

    const myCharacter = useSelector(state => state.detail)

    return (
        <div>
        {
            myCharacter.length > 0 ?
            <div>
                <h1>{myCharacter[0].name}</h1>
                <img src={myCharacter[0].img ? myCharacter[0].img :  myCharacter[0].image} alt="img not found"/>
                <h2>Status: {myCharacter[0].status}</h2>
                <p>Birthday: {myCharacter[0].birthday}</p>
                <h4>Occupations: {!myCharacter[0].createdInDb ? myCharacter[0].occupation + ' ' : myCharacter[0].occupations.map(el => el.name + ' ')}</h4>
            </div> : <p>Loading...</p>
        }
        <Link to='/home'>
            <button>Back</button>
        </Link>
        </div>
    )
}