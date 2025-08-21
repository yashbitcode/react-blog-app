import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import authService from "./appwrite/auth";
import { login } from "./store/authSlice";
import Header from "./components/Header/Header";

const App = () => {
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        authService.getCurrentUser()
        .then((userData) => dispatch(login({ userData })))
        .finally(() => setLoading(false));
    }, []);

    return loading && (
        <div className="text-neutral-700 text-4xl">
            <Header />
        </div>
    );
};

export default App;
