import {AuthorApiType} from "../api/api";
import {fetchPostsSuccess, mapToLookUpTable} from "./posts-reducer";

type StateType = typeof initialState

const initialState = {
    byId: {} as { [key: string]: AuthorApiType }
}

export const authorsReducer = (state = initialState, action:
    | ReturnType<typeof fetchPostsSuccess>): StateType => {
    switch (action.type) {
        case "posts/fetchPostsSuccess": {
            return {
                ...state,
                byId: mapToLookUpTable(action.payload.posts.map(p => p.author))
            }
        }
    }

    return state
}