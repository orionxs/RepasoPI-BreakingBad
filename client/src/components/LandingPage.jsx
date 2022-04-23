import React from "react"
import {Link} from "react-router-dom"

export default function landingPage() {
    return (
        <div>
            <h1>Welcome to the Breaking Bad page</h1>
            <Link to='/home'>
                <button>Start</button>
            </Link>
        </div>
    )
}