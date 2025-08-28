import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Provider } from "react-redux";
import { store } from "./store/store.ts";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home.tsx";
import Login from "./pages/Login.tsx";
import Protected from "./components/Protected/Protected.tsx";
import SignUp from "./pages/SignUp.tsx";
import AddPost from "./pages/AddPost.tsx";
import EditPost from "./pages/EditPost.tsx";

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "/login",
                element: (
                    <Protected authenticated={false}>
                        <Login />
                    </Protected>
                )
            },
            {
                path: "/sign-up",
                element: (
                    <Protected authenticated={false}>
                        <SignUp />
                    </Protected>
                )
            },
            {
                path: "/all-posts",
                element: (
                    <Protected>
                        <Home />
                    </Protected>
                )
            },
            {
                path: "/add-post",
                element: (
                    <Protected>
                        <AddPost />
                    </Protected>
                )
            },
            {
                path: "/edit-post/:slug",
                element: (
                    <Protected>
                        <EditPost />
                    </Protected>
                )
            },
            {
                path: "/post/:slug",
                element: <EditPost />
            },
        ]
    }
])

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <Provider store={store}>
            <RouterProvider router={router} />
        </Provider>
    </StrictMode>
);
