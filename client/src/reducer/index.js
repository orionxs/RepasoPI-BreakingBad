const initialState = {
  characters: [],
  allCharacters: [],
  occupations: [],
  detail: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_CHARACTERS":
      return {
        ...state,
        characters: action.payload,
        allCharacters: action.payload,
      };        

    case "GET_NAME_CHARACTERS":
        return{
            ...state,
            characters: action.payload
        }

        case "GET_OCCUPATIONS":
        return{
            ...state,
            occupations: action.payload
        }

        case "POST_CHARACTER":
        return{
            ...state,
        }

        case 'GET_DETAILS':
            return {
                ...state,
                detail: action.payload
            }

    case "FILTER_BY_STATUS":
      const allCharacters = state.allCharacters;
      const statusFiltered =
        action.payload === "All"
          ? allCharacters
          : allCharacters.filter((el) => el.status === action.payload);
      return {
        ...state,
        characters: statusFiltered,
      };

    case "FILTER_CREATED":
      const allCharacters2 = state.allCharacters;
      const createdFilter =
        action.payload === "created"
          ? allCharacters2.filter((el) => el.createdInDb)
          : allCharacters2.filter((el) => !el.createdInDb);
      return {
        ...state,
        characters:action.payload === "All" ? state.allCharacters : createdFilter,
      };

      case "ORDER_BY_NAME":
          let sortedArr = action.payload === "asc" ? state.characters.sort(function (a, b) {
            if (a.name > b.name) {
              return 1;
            }
            if (b.name > a.name) {
              return -1;
            }
            // a debe ser igual b
            return 0;
          }) :
          state.characters.sort(function (a, b) {
            if (a.name > b.name) {
              return -1;
            }
            if (b.name > a.name) {
              return 1;
            }
            // a debe ser igual b
            return 0;
        })
        return {
            ...state,
            characters : sortedArr,
        }


    default:
      return state;
  }
}

export default rootReducer;
