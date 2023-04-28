import {api, PostType} from "../api/api";
import {Dispatch} from "redux";

const initialState = {
    // items: [] as PostType[],
    allIds: [] as number[],
    byId: {} as { [key: string]: PostType }
}

const mapToLookUpTable = (items: any[]) => {
    return items.reduce((acc, item) => {
        acc[item.id] = item
        return acc
    }, {})
}

export const postsReducer = (state = initialState, action:
    | ReturnType<typeof fetchPostsSuccess>
    | ReturnType<typeof updatePostsSuccess>) => {
    switch (action.type) {
        case "posts/fetchPostsSuccess": {
            return {
                ...state,
                // items: action.payload.posts,
                allIds: action.payload.posts.map(p => p.id),
                byId: mapToLookUpTable(action.payload.posts)

            }
        }
        case "posts/updatePostSuccess": {
            return {
                ...state,
                // items: state.items.map((post) => post.id === action.payload.postId ? {...post, text: action.payload.text} : post)
                byId: {
                    ...state.byId,
                    [action.payload.postId]: {
                        ...state.byId[action.payload.postId],
                        text: action.payload.text
                    }
                }
            }
        }

    }

    return state
}

export const fetchPostsSuccess = (posts: PostType[]) => ({
    type: "posts/fetchPostsSuccess",
    payload: {posts}
} as const)

export const updatePostsSuccess = (postId: number, text: string) => ({
    type: "posts/updatePostSuccess",
    payload: {postId, text}
} as const)

export const fetchPosts = () => async (dispatch: Dispatch) => {
    const posts = await api.getPosts()
    dispatch(fetchPostsSuccess(posts))
}

export const updatePost = (postId: number, text: string) => async (dispatch: Dispatch) => {
    const res = await api.updatePost(postId, text)
    dispatch(updatePostsSuccess(postId, text))
}