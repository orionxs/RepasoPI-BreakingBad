import React from "react";
import './pagination.css'

function Pagination({charactersPerPage, allCharacters, paginado}) {
    const pageNumbers = [];
  
    for(let i =1; i<= Math.ceil(allCharacters/charactersPerPage); i++) {
        pageNumbers.push(i);
    }
      return (
        <div className='paginationDiv'>
        <nav > 
            <ul className= 'pagination'>
                {pageNumbers.map((n,i )=> (
                    <div className = 'center'>
                    <li key={i +1}>
                        <button className='numberStyles' onClick ={ () => paginado(n)} >
                            {n}
                        </button>
                    </li>
                    </div>
                ))}
            </ul>
        </nav>
        </div>
      );
    }
    
    export default Pagination; 