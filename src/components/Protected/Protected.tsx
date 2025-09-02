import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import { Navigate } from "react-router-dom";
import VerificationComp from "../Verification/VerificationComp";

const Protected = ({
    children,
    authenticated = true,
}: {
    children: React.ReactNode;
    authenticated?: boolean;
}) => {
    const authStatus = useSelector((state: RootState) => state.auth.status);
    const verificationStatus = useSelector((state: RootState) => state.auth.verified);

    if (authenticated && authStatus !== authenticated) { 
        return <Navigate to="/login" replace />;
    }

    if (!authenticated && authStatus !== authenticated) {
        return <Navigate to="/" replace />;
    }

    return <div>
        {
            verificationStatus || !authStatus || window.location.pathname === "/verify" ? children : <VerificationComp />
        }
    </div>;
};

export default Protected;
// not login -> f & f !== f, t & f !== f
    // login -> f & t !== f, t & t !== f
// t & f !== t