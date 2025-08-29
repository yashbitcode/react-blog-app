import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import { Navigate } from "react-router-dom";

const Protected = ({
    children,
    authenticated = true,
}: {
    children: React.ReactNode;
    authenticated?: boolean;
}) => {
    const authStatus = useSelector((state: RootState) => state.auth.status);

    // if (authenticated && authStatus !== authenticated) {
    //     return <Navigate to="/login" replace />;
    // }

    if (!authenticated && authStatus !== authenticated) {
        return <Navigate to="/" replace />;
    }

    return <div>{children}</div>;
};

export default Protected;
