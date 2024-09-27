import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    viewSearch : false,
    searchResults: []
}

const slice = createSlice({
    name: "Search",
    initialState,
    reducers: {
        closeSearch(state){
            state.viewSearch = false;
        },
        openSearch(state){
            state.viewSearch = true;
        },
        setSearchResults(state,action){
            state.searchResults = [...action.payload]
        }
    }
})

export default slice.reducer;
export const {closeSearch,openSearch,setSearchResults} = slice.actions;
