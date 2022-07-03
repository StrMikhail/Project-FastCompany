import { createSlice } from "@reduxjs/toolkit";
import profService from "../services/profession.service";



const professionSlice = createSlice({
    name: "professions",
    initialState: {
        entities: null,
        isLoading: true, 
        error: null,
        lastFetch: null
    },
    reducers: {
        professionsRequested: (state) => {
            state.isLoading = true
        },
        professionsReceved: (state, action) => {
            state.entities = action.payload
            state.lastFetch = Date.now()
            state.isLoading = false
        },
        professionsRequestFailed: (state, action) => {
            state.error = action.payload
            state.isLoading = false
        }
    }
})

const { reducer:professionsReducer, actions } = professionSlice;
const { professionsRequested, professionsReceved, professionsRequestFailed } = actions

function isOutDate(date) {
    if (Date.now() - date > 3600) {
        return true
    }
    return false 
}

export const loadProfessionsList = () => async (dispatch, getState) => {
    const { lastFetch } = getState().professions
    if (isOutDate(lastFetch)) {
        dispatch(professionsRequested())
        try {
            const { content } = await profService.get();
            dispatch(professionsReceved(content))
        } catch (error) {
            dispatch(professionsRequestFailed(error.message))
        }
    }
}


export const getProfessions = () => (state) => state.professions.entities
export const getProfessionsLoadingStatus = () => (state) => state.professions.isLoading
export const getProfessionsById = (professionId) => (state) => {
    if (state.professions.entities) {
        return state.professions.entities.find(prof => prof._id === professionId)
    }
}
export default professionsReducer;