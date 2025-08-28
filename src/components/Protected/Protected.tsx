import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import { useNavigate } from "react-router-dom";

const Protected = ({
    children,
    authenticated = true
}: {
    children: React.ReactNode;
    authenticated?: boolean;
}) => {
    const [loading, setLoading] = useState(true);

    const authStatus = useSelector((state: RootState) => state.auth.status);
    const navigate = useNavigate();

    useEffect(() => {   
        if(authenticated && authStatus !== authenticated) navigate("/login");
        else if(!authenticated && authStatus !== authenticated) navigate("/");

        setLoading(false);
    }, [authStatus, authenticated, navigate]);

    return loading && (
        <div>{children}</div>
    );
};

export default Protected;