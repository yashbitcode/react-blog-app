import { useEffect } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import { useNavigate } from "react-router-dom";

const Protected = ({
    children,
    authenticated = true
}: {
    children: React.ReactNode;
    authenticated: boolean;
}) => {
    const authStatus = useSelector((state: RootState) => state.auth.status);
    const navigate = useNavigate();

    useEffect(() => {   
        if(authenticated && authStatus !== authenticated) navigate("/login");
        else if(!authenticated && authStatus !== authenticated) navigate("/");
    }, [authStatus, authenticated, navigate]);

    return (
        <div>Protected</div>
    );
};

export default Protected;