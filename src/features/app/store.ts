import {applyMiddleware, combineReducers, createStore} from "redux";
import {postsReducer} from "../posts-reducer";
import thunkMiddleware from "redux-thunk";
import {authorsReducer} from "../authors-reducer";
import {commentsReducer} from "../comments-reducer";


const rootReducer = combineReducers({
    posts: postsReducer,
    authors: authorsReducer,
    comments: commentsReducer
})

export type AppStateType = ReturnType<typeof rootReducer>
export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))

// @ts-ignore
window.store = store