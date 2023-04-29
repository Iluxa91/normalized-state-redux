import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Post} from "../features/components/Post";
import {AppStateType} from "../features/app/store";
import {fetchPosts} from "../features/posts-reducer";

export const PostPage = () => {

    const postIds = useSelector<AppStateType, number[]>(state => state.posts.allPostsIds)
    const dispatch = useDispatch<any>()

    useEffect(() => {
        dispatch(fetchPosts())
    }, [])
    return (
        <div>
            {postIds.map(postId => <Post key={postId} postId={postId}/>)}
        </div>
    );
};