import {applyMiddleware, combineReducers, createStore} from "redux";
import {postsReducer} from "../reducer";
import thunkMiddleware from "redux-thunk";


const rootReducer = combineReducers({
    posts: postsReducer
})

export type AppStateType = ReturnType<typeof rootReducer>
export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))