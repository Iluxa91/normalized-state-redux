import {AuthorApiType} from "../api/api";
import {fetchPostsSuccess, mapToLookUpTable} from "./posts-reducer";
import {fetchPostCommentsSuccess} from "./comments-reducer";

type StateType = typeof initialState

const initialState = {
    byId: {} as { [key: string]: AuthorApiType }
}

export const authorsReducer = (state = initialState, action:
    | ReturnType<typeof fetchPostsSuccess>
| ReturnType<typeof fetchPostCommentsSuccess>
): StateType => {
    switch (action.type) {
        case "posts/fetchPostsSuccess": {
            return {
                ...state,
                byId: {
                    ...state.byId,
                    ...mapToLookUpTable(action.payload.posts.map(p => p.author)),
                    ...mapToLookUpTable(action.payload.posts.map(p => p.lastComments).flat().map(c => c.author))
                }
            }
        }
        case "posts/fetchPostCommentsSuccess":{
            return {
                ...state,
                byId: {
                    ...state.byId,
                    ...mapToLookUpTable(action.payload.comments.map(c => c.author))
                }

            }
        }
    }

    return state
}