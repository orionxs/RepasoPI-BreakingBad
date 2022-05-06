import axios from "axios";


export const getCharacters = () => {
    return async function (dispatch) {
      return axios.get('http://localhost:3001/characters')
        .then(char => dispatch({type: 'GET_CHARACTERS', payload: char.data}))
        .catch(err => console.error(err))
    };
  };

  export const getNameCharacters = (name) => {
    return async (dispatch) => {
      return axios.get('http://localhost:3001/characters?name=' + name)
        .then(char => dispatch({type: 'GET_NAME_CHARACTERS', payload: char.data}))
        .catch(err => console.error(err))
    };
  };

  export const getOccupations = () => {
    return async (dispatch) => {
      return axios.get('http://localhost:3001/occupations')
        .then(ocu => dispatch({type: 'GET_OCCUPATIONS', payload: ocu.data}))
        .catch(err => console.error(err))
    };
  };

  export const postCharacter = (payload) => {
    return async (dispatch) => {
      return axios.post('http://localhost:3001/character', payload)
        .then(char => dispatch({type: 'POST_CHARACTER', payload: char.data}))
        .catch(err => console.error(err))
    };
  };

  

export const getDetail = (id) => {
  return async (dispatch) => {
    return axios.get(`http://localhost:3001/characters/${id}`)
      .then(char => dispatch({type: 'GET_DETAILS', payload: char.data}))
      .catch(err => console.error(err))
  };
};


  export const filterCharactersByStatus = (payload) => {
    return {
      type: 'FILTER_BY_STATUS',
      payload
    }
  }

  export const filterCreated = (payload) => {
    return {
      type: 'FILTER_CREATED',
      payload
    }
  }

  export const orderByName = (payload) => {
    return {
      type: 'ORDER_BY_NAME',
      payload
    }
  }