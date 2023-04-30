import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../app/store";
import {CommentType, deletePostComment} from "../comments-reducer";
import {AuthorApiType} from "../../api/api";

export const Comment: React.FC<{ id: number, postId: number }> = ({id, postId}) => {
    const comment = useSelector<AppStateType, CommentType>(state => state.comments.byId[id])
    const author = useSelector<AppStateType, AuthorApiType>(state => state.authors.byId[comment.authorId])

    const dispatch = useDispatch<any>()

    return (
        <li><b>{author.name}</b> {comment.text} <button onClick={()=>dispatch(deletePostComment(postId, id))}>x</button></li>
    )
}