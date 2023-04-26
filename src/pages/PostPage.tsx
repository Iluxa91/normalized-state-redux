import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Post} from "../features/components/Post";
import {AppStateType} from "../features/app/store";
import {PostType} from "../api/api";
import {fetchPosts} from "../features/reducer";

export const PostPage = () => {

    const items = useSelector<AppStateType, PostType[]>(state => state.posts.items)
    const dispatch = useDispatch<any>()

    useEffect(() => {
        dispatch(fetchPosts())
    }, [dispatch])
    return (
        <div>
            {items.map(item => <Post key={item.id} post={item}/>)}
        </div>
    );
};