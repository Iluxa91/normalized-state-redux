import React, {useState} from "react";
import {PostType} from "../../api/api";
import {useDispatch} from "react-redux";
import {updatePost} from "../reducer";

export const Post: React.FC<{ post: PostType }> = ({post}) => {
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
            }} onChange={(e) => setText(e.currentTarget.value)}>{text}</textarea>}
            <br/>
            Likes: {post.likes}
            <hr/>
        </div>
    );
};