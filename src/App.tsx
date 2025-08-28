import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Header from "./components/Header/Header";
import { Outlet } from "react-router-dom";
import authService from "./appwrite/auth";
import { login } from "./store/authSlice";

const App = () => {
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        authService
            .getCurrentUser()
            .then((userData) => {
                if(userData) dispatch(login({ userData }));
            })
            .finally(() => setLoading(false));
    }, []);

    return (
        !loading && (
            <div className="text-neutral-700">
                <Header />
                <Outlet />
            </div>
        )
    );
};

export default App;
