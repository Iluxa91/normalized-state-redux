import {api, PostApiType} from "../api/api";
import {Dispatch} from "redux";
import {deletePostCommentSuccess, fetchPostCommentsSuccess} from "./comments-reducer";

export type PostType = {
    id: number
    text: string
    likes: number
    authorId: number
    commentsIds: number[]
}

const initialState = {
    // items: [] as PostType[],
    allPostsIds: [] as number[],
    byId: {} as { [key: string]: PostType }


}

type LookUpTableType<T> = { [key: string]: T }


export const mapToLookUpTable = <T extends { id: number }>(items: T[]) => {
    const acc: LookUpTableType<T> = {}
    return items.reduce((acc, item) => {
        acc[item.id] = item
        return acc
    }, acc)
}

export const postsReducer = (state = initialState, action:
    | ReturnType<typeof fetchPostsSuccess>
    | ReturnType<typeof updatePostsSuccess>
    | ReturnType<typeof fetchPostCommentsSuccess>
    | ReturnType<typeof deletePostCommentSuccess>) => {
    switch (action.type) {
        case "posts/fetchPostsSuccess": {
            return {
                ...state,
                // items: action.payload.posts,
                allPostsIds: action.payload.posts.map(p => p.id),
                byId: mapToLookUpTable(action.payload.posts.map(p => {
                    const copy: PostType = {
                        id: p.id,
                        text: p.text,
                        authorId: p.author.id,
                        likes: p.likes,
                        commentsIds: p.lastComments.map(c => c.id)

                    }
                    return copy
                }))

            }
        }
        case "posts/fetchPostCommentsSuccess": {
            return {
                ...state, byId: {
                    ...state.byId,
                    [action.payload.postId]: {
                        ...state.byId[action.payload.postId],
                        commentsIds: action.payload.comments.map(c => c.id)
                    }
                }
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
        case "posts/deletePostCommentSuccess": {
            const post = state.byId[action.payload.postId]
            return {
                ...state, byId: {
                    ...state.byId,
                    [action.payload.postId]: {
                        ...post,
                        commentsIds: post.commentsIds.filter(id => id !== action.payload.commentId)
                    }
                }
            }
        }

    }

    return state
}

export const fetchPostsSuccess = (posts: PostApiType[]) => ({
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