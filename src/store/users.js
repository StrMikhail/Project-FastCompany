import { createSlice, createAction } from "@reduxjs/toolkit";
import authService from "../services/auth.service";
import { generateAuthError } from "../services/generateAuthError";
import localStorageservice from "../services/localStorage.service";
import useService from "../services/user.service";
import history from "../utils/history";
import randomInt from "../utils/randomInt";


const usersSlice = createSlice({
    name: "users",
    initialState: {
        entities: null,
        isLoading: localStorageservice.getUserId() ? true : false, 
        error: null,
        auth: localStorageservice.getUserId() ? {userId: `${localStorageservice.getUserId()}`} : null, 
        isLoggedIn: localStorageservice.getUserId() ? true : false,
        dataLoaded: false,
    },
    reducers: {
        usersRequested: (state) => {
            state.isLoading = true
        },
        usersReceved: (state, action) => {
            state.entities = action.payload
            state.isLoading = false
            state.dataLoaded = true
        },
        usersRequestFailed: (state, action) => {
            state.error = action.payload
            state.isLoading = false
            state.dataLoaded = false
        },
        authRequestSuccess: (state, action) => {
            state.auth = action.payload
            state.isLoggedIn = true
            console.log('Вход прошел успешно')
        },
        authRequestFailed: (state, action) => {
            state.error = action.payload
        },
        userCreated: (state, action) => {
            if (!Array.isArray(state.entities)) {
                state.entities = [];
            }
            state.entities.push(action.payload)
        },
        userLoggedOut:(state) => {
            state.entities = null
            state.isLoggedIn = false 
            state.auth = null
            state.dataLoaded = false
        },
        userDataUpdate: (state, action) => {
            state.entities[state.entities.findIndex(user=> user._id === action.payload._id)] = action.payload;
        },
        authRequested: (state) => {
            state.error = null
        }
    }
})

const { reducer:usersReducer, actions } = usersSlice;
const {
    usersRequested,
    usersReceved,
    usersRequestFailed,
    authRequestSuccess,
    authRequestFailed, userCreated,
    userLoggedOut,
    userDataUpdate
} = actions

const authRequested = createAction("users/authRequested");
const userCreateRequested = createAction("users/userCreateRequested");
const createUserFailed = createAction("users/createUserFailed");
const updateUserData = createAction("users/updateUserData");
const updateUserDataFailed = createAction("users/userUpdateDataFailed");

export const login = ({payload, redirect}) => async (dispatch) => {
    const { email, password } = payload
    dispatch(authRequested)
    try {
        const data = await authService.login({ email, password })
        dispatch(authRequestSuccess({userId: data.localId}));
        localStorageservice.setTokens(data)
        history.push(redirect)
    } catch (error) {
        const {code, message} = error.response.data.error
        if (code === 400) {
            const errorMessage = generateAuthError(message) 
            dispatch(authRequestFailed(errorMessage))
        } else {
            dispatch(authRequestFailed(error.message))
        }
    }
}

export const signUp = ({email, password, ...rest}) => async (dispatch) => {
    dispatch(authRequested())
    try {
        const data = await authService.register({ email, password })
        localStorageservice.setTokens(data)
        dispatch(authRequestSuccess({ userId: data.localId}))
        dispatch(createUser({
            _id: data.localId,
            rate: randomInt(1,5),
            completedMeetings: randomInt(0,200),
            image: `https://avatars.dicebear.com/api/avataaars/${(
                    Math.random() + 1
                )
                    .toString(36)
                    .substring(7)}.svg`,
            email,
            ...rest
        }))
    } catch (error) {
        dispatch(authRequestFailed(error.message))
    }
}
export const logOut = () => (dispatch) => {
    localStorageservice.removeAuthData()
    dispatch(userLoggedOut())
    history.push("/")
} 
export const updateUser = (payload) => async (dispatch) => {
    dispatch(updateUserData(payload));
    try {
        const { content } = await useService.updateUser(payload);
        dispatch(userDataUpdate(content));
        history.push(`/users/${payload._id}`);
    } catch (error) {
        dispatch(updateUserDataFailed(error.message));
    }
};
function  createUser (payload){
    return async function (dispatch){
        dispatch(userCreateRequested());
        try {
            const { contetn } = await useService.create(payload)

            dispatch(userCreated(contetn))
            history.push("/users")
        } catch (error) {
            dispatch(createUserFailed(error.message))  
        }
    };
}

export const loadUsersList = () => async (dispatch, getState) => {
    dispatch(usersRequested())
    try {
        const { content } = await useService.get();
        dispatch(usersReceved(content))
    } catch (error) {
        dispatch(usersRequestFailed(error.message))
    }
}
export const getUsers = () => (state) => state.users.entities
export const getUsersLoadingStatus = () => (state) => state.users.isLoading

export const getCurrentUserData = () => (state) => {
    return state.users.entities
        ? state.users.entities.find((u) => u._id === state.users.auth.userId)
        : null;
};
export const getUserById = (userId) => (state) => {
    if (state.users.entities) {
        return state.users.entities.find(user => user._id === userId)
    }
}

export const getIsLoggedIn = () => (state) => state.users.isLoggedIn
export const getDataStatus = () => (state) => state.users.dataLoaded
export const getCurrentUserId = () => (state) => state.users.auth.userId 
export const getAuthErrors = () => (state) => state.users.error
export default usersReducer