import {api, PostType} from "../api/api";
import {Dispatch} from "redux";

const initialState = {
    items: [] as PostType[]
}

export const postsReducer = (state = initialState, action: ReturnType<typeof fetchPostsSuccess>) => {
    switch (action.type) {
        case "fetchPostsSuccess": {
            return {
                ...state, items: action.payload.posts
            }
        }
        default:
            return state
    }
}

export const fetchPostsSuccess = (posts: PostType[]) => ({
    type: "fetchPostsSuccess",
    payload: {posts}
} as const)

export const fetchPosts = () => async (dispatch: Dispatch) => {
    const posts = await api.getPosts()
    dispatch(fetchPostsSuccess(posts))
}