import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {PostType, updatePost} from "../posts-reducer";
import {AppStateType} from "../app/store";
import {AuthorApiType} from "../../api/api";
import {Comment} from "./Comment";
import {fetchPostComments, fetchPostCommentsSuccess} from "../comments-reducer";

export const Post: React.FC<{ postId: number }> = ({postId}) => {

    const post = useSelector<AppStateType, PostType>(state => state.posts.byId[postId])
    const author = useSelector<AppStateType, AuthorApiType>(state => state.authors.byId[post.authorId])
    console.log(post)
    const [editMode, setEditMode] = useState(false)
    const [text, setText] = useState(post.text)
    const dispatch = useDispatch<any>()

    return (
        <div>
            <b>{author.name} </b>
            <br/>
            {!editMode &&
                <span onDoubleClick={() => setEditMode(true)}>{post.text}</span>}

            {editMode && <textarea onBlur={() => {
                setEditMode(false)
                dispatch(updatePost(post.id, text))
            }} onChange={(e) => setText(e.currentTarget.value)} value={text}/>}
            <br/>
            Likes: {post.likes}
            <hr/>
            Comments:
            <ul>
                {post.commentsIds.map(id => <Comment key={id} id={id} postId={postId}/>)}
            </ul>
            <button onClick={() => dispatch(fetchPostComments(postId))}>show all
                comments
            </button>
        </div>
    );
};

