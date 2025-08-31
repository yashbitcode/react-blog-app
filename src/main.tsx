import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Provider } from "react-redux";
import { store } from "./store/store.ts";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Protected from "./components/Protected/Protected.tsx";
import { AddPost, EditPost, Home, Login, Post, SignUp, YourPosts } from "./pages";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/login",
                element: (
                    <Protected authenticated={false}>
                        <Login />
                    </Protected>
                ),
            },
            {
                path: "/sign-up",
                element: (
                    <Protected authenticated={false}>
                        <SignUp />
                    </Protected>
                ),
            },
            {
                path: "/all-posts",
                element: (
                    <Protected>
                        <Home />
                    </Protected>
                ),
            },
            {
                path: "/add-post",
                element: (
                    <Protected>
                        <AddPost />
                    </Protected>
                ),
            },
            {
                path: "/edit-post/:slug",
                element: (
                    <Protected>
                        <EditPost />
                    </Protected>
                ),
            },
            {
                path: "/post/:slug",
                element: (
                    <Protected>
                        <Post />
                    </Protected>
                ),
            },
            {
                path: "/your-posts",
                element: (
                    <Protected>
                        <YourPosts />
                    </Protected>
                ),
            }
        ],
    },
]);

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <Provider store={store}>
            <RouterProvider router={router} />
        </Provider>
    </StrictMode>
);
