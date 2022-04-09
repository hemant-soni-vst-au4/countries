export const FETCH_COUNTRIES = 'FETCH_COUNTRIES';
export const FETCH_COUNTRIES_SUCCESS = 'FETCH_COUNTRIES_SUCCESS';
export const FETCH_COUNTRY_FAILURE = 'FETCH_COUNTRY_FAILURE';


//types 

export type CountryReducerState= {
    countries: [],
    isLoading: boolean,
    error: string
}

export type FetchAllCountriesAction={
       type: typeof FETCH_COUNTRIES
       payload?: string
}
