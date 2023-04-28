import React, {useState} from "react";
import {PostType} from "../../api/api";
import {useDispatch, useSelector} from "react-redux";
import {updatePost} from "../reducer";
import {AppStateType} from "../app/store";

export const Post: React.FC<{ postId: number }> = ({postId}) => {

    const post = useSelector<AppStateType, PostType>(state => state.posts.byId[postId])
    console.log(post)
    const [editMode, setEditMode] = useState(false)
    const [text, setText] = useState(post.text)
    const dispatch = useDispatch<any>()

    return (
        <div>
            <b>{post.author.name} </b>
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
        </div>
    );
};