import {api, CommentApiType, PostApiType} from "../api/api";
import {Dispatch} from "redux";
import {fetchPostsSuccess, mapToLookUpTable} from "./posts-reducer";

export type CommentType = Omit<CommentApiType, "author"> & { authorId: number }

const initialState = {
    byId: {} as { [key: string]: CommentType }
}

export const commentsReducer = (state = initialState, action:
    | ReturnType<typeof fetchPostsSuccess>
    | ReturnType<typeof fetchPostCommentsSuccess>
    | ReturnType<typeof deletePostCommentSuccess>
) => {
    switch (action.type) {
        case "posts/fetchPostsSuccess": {
            return {
                ...state,
                byId: {
                    ...state.byId,
                    ...mapToLookUpTable(action
                        .payload.posts.map(p => p.lastComments).flat().map(c => {
                            const comment: CommentType = {
                                authorId: c.author.id,
                                text: c.text,
                                id: c.id
                            }
                            return comment
                        })
                    )
                }

            }
        }
        case "posts/fetchPostCommentsSuccess": {
            const lookUpTable = mapToLookUpTable(action.payload.comments.map(c => {
                const comment: CommentType = {
                    authorId: c.author.id,
                    text: c.text,
                    id: c.id
                }
                return comment
            }))
            return {...state, byId: {...state.byId, ...lookUpTable}}
        }

        case "posts/deletePostCommentSuccess": {
            const byIdCopy = {
                ...state.byId,
            }
            delete byIdCopy[action.payload.commentId]
            return {
                ...state,
                byId: byIdCopy
            }
        }
    }
    return state
}


export const fetchPostCommentsSuccess = (postId: number, comments: CommentApiType[]) => ({
    type: "posts/fetchPostCommentsSuccess",
    payload: {comments, postId}
} as const)

export const deletePostCommentSuccess = (postId: number, commentId: number) => ({
    type: "posts/deletePostCommentSuccess",
    payload: {postId, commentId}
} as const)

export const fetchPostComments = (postId: number) => async (dispatch: Dispatch) => {
    const comments = await api.getComments(postId)
    dispatch(fetchPostCommentsSuccess(postId, comments))
}

export const deletePostComment = (postId: number, commentId: number) => async (dispatch: Dispatch) => {
    const comments = await api.deleteComment(postId, commentId)
    dispatch(deletePostCommentSuccess(postId, commentId))
}