import axios from "axios";


export const getCharacters = () => {
    return async function (dispatch) {
      return axios.get('http://localhost:3001/characters')
        .then(char => dispatch({type: 'GET_CHARACTERS', payload: char.data}))
        .catch(err => console.error(err))
    };
  };