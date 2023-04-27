import React from "react";
import "./App.css";
import {PostPage} from "./pages/PostPage";
import {Provider} from "react-redux";

export const App: React.FC<{ store: any }> = ({store}) => {
    return (
        <Provider store={store}>
            <div className="App">
                <PostPage/>
            </div>
        </Provider>

    );
}