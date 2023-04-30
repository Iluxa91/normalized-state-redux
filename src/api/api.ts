import {deletePostCommentSuccess} from "../features/comments-reducer";

export type PostApiType = {
    id: number
    text: string
    likes: number
    author: AuthorApiType
    lastComments: CommentApiType[]
}
export type CommentApiType = {
    id: number
    text: string
    author: AuthorApiType
}
export type AuthorApiType = {
    id: number
    name: string
}


export const api = {
    getPosts(): Promise<PostApiType[]> {
        return new Promise((res) => {
            setTimeout(() => {
                res([
                    {
                        id: 1,
                        text: "Hello",
                        likes: 10,
                        author: {
                            id: 1,
                            name: "Dima"
                        },
                        lastComments: [
                            {id: 998, text: "Cool", author: {id: 3, name: "Sveta"}},
                            {id: 997, text: "Very Cool", author: {id: 3, name: "Sveta"}}
                        ]
                    },
                    {
                        id: 2,
                        text: "I like React",
                        likes: 1002,
                        author: {
                            id: 2,
                            name: "Valera"
                        },
                        lastComments: []
                    },
                    {
                        id: 3,
                        text: "I like Angular",
                        likes: 100,
                        author: {
                            id: 1,
                            name: "Dima"
                        },
                        lastComments: [
                            {id: 897, text: "Yeap", author: {id: 1, name: "Dima"}},
                            {id: 896, text: "Really?", author: {id: 2, name: "Valera"}}
                        ]
                    }
                ])
            }, 2000)
        })
    },
    updatePost(postId: number, text: string) {
        return Promise.resolve({})
    },
    getComments(postId: number) {
        return Promise.resolve([
            {id: 897, text: "Yeap", author: {id: 1, name: "Dima"}},
            {id: 896, text: "Really", author: {id: 2, name: "Valera"}},
            {id: 895, text: "Hello", author: {id: 3, name: "Sveta"}},
            {id: 894, text: "Hi", author: {id: 1, name: "Dima"}},
        ])
    },
    deleteComment(postId: number, commentId: number){
        return Promise.resolve({})
    }
}