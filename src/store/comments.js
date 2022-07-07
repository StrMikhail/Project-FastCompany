import { createSlice, createAction } from "@reduxjs/toolkit";
import commentService from "../services/comment.service";
import  { nanoid } from "nanoid";

const commentSlice = createSlice({
    name: "comments",
    initialState: {
        entities: null,
        isLoading: true, 
        error: null,
    },
    reducers: {
        commentsRequested: (state) => {
            state.isLoading = true
        },
        commentsReceved: (state, action) => {
            state.entities = action.payload
            state.isLoading = false
        },
        commentsRequestFailed: (state, action) => {
            state.error = action.payload
            state.isLoading = false
        },
        addComment: (state, action) => {
            state.entities = [...state.entities, action.payload]
        },
        deleteComment: (state, action) => {
            state.entities = state.entities.filter(comment => comment._id !== action.payload)
        },
        commentRequestFailed: (state, action) => {
            state.error = action.payload
        },
    }
})

const { reducer:commentsReducer, actions } = commentSlice;
const {
    commentsRequested,
    commentsReceved,
    commentsRequestFailed,
    deleteComment,
    addComment
} = actions


// const addNewComment = createAction("comments/addComment");


function isOutDate(date) {
    if (Date.now() - date > 3600) {
        return true
    }
    return false 
}

export const loadCommentsList = (userId) => async (dispatch) => {
        dispatch(commentsRequested())
        try {
            const { content } = await commentService.getComments(userId);
            dispatch(commentsReceved(content))
        } catch (error) {
            dispatch(commentsRequestFailed(error.message))
        }
}

export const createComment = (payload) => async (dispatch) => {
    const comment = {
        ...payload, 
        _id: nanoid(),
        created_at: Date.now(),
    }
    dispatch(addComment(comment))

    try {
        await commentService.createComment(comment)
    } catch (error) {
        dispatch(commentsRequestFailed(error.message))
    }
}
export const removeComment = (payload) => async (dispatch) => {
    dispatch(deleteComment(payload))
    try {
        const { content } = await commentService.removeComment(payload)


    } catch (error) {
        dispatch(commentRequestFailed(error.message))

    }
}

export const getComments = () => (state) => state.comments.entities
export const getCommentsLoadingStatus = () => (state) => state.comments.isLoading

export default commentsReducer;