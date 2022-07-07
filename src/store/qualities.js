import { createSlice } from "@reduxjs/toolkit";
import qualityService from "../services/quality.service";


const qualitiesSlice = createSlice({
    name: "qualities",
    initialState: {
        entities: null,
        isLoading: true, 
        error: null,
        lastFetch: null
    },
    reducers: {
        qualitiesRequested: (state) => {
            state.isLoading = true
        },
        qualitiesReceved: (state, action) => {
            state.entities = action.payload
            state.lastFetch = Date.now()
            state.isLoading = false
        },
        qualitiesRequestFailed: (state, action) => {
            state.error = action.payload
            state.isLoading = false
        }
    }
})

const { reducer:qualitiesReducer, actions } = qualitiesSlice;
const { qualitiesReceved, qualitiesRequested, qualitiesRequestFailed } = actions

function isOutDate(date) {
    if (Date.now() - date > 3600) {
        return true
    }
    return false 
}

export const loadQualitiesList = () => async (dispatch, getState) => {
    const { lastFetch } = getState().qualities
    if (isOutDate(lastFetch)) {
        dispatch(qualitiesRequested())
        try {
            const { content } = await qualityService.get();
            dispatch(qualitiesReceved(content))
        } catch (error) {
            dispatch(qualitiesRequestFailed(error.message))
        }
    }

}

export const getQualities = () => (state) => state.qualities.entities
export const getQualitiesLoadingStatus = () => (state) => state.qualities.isLoading
export const getQualitiesById = (qualitiesIds) => (state) => {
    if (state.qualities.entities) {
        const qualitiesArray = []
        for(const qualId of qualitiesIds){
            for (const quality of state.qualities.entities){
                if (qualId === quality._id) {
                    qualitiesArray.push(quality)
                        break
                    }
            }
        } 
        return qualitiesArray
    }
    return []
}
export default qualitiesReducer;