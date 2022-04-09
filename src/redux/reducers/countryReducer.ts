import { CountryReducerState, FETCH_COUNTRIES, FETCH_COUNTRIES_SUCCESS, FETCH_COUNTRY_FAILURE  } from '../../types'

const intialState:CountryReducerState = {
    countries: [],
    isLoading: false,
    error: ''
}

const countryReducer = (state:CountryReducerState = intialState, action:any) => {
    switch(action.type) {
        case FETCH_COUNTRIES:
            return {
                ...state,
                isLoading: true
            }
        case FETCH_COUNTRIES_SUCCESS:
            return {
                ...state,
                isLoading: false,
                countries: action.payload,
                error: ''
            }
        case FETCH_COUNTRY_FAILURE:
            return {
                ...state,
                isLoading: false,
                error:action.payload
            }
        default:
            return state
    }
}

export default countryReducer;