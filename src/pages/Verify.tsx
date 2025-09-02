import { useEffect, useState } from "react";
import authService from "../appwrite/auth";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store/store";
import { setVerificationStatus } from "../store/authSlice";
import VerificationComp from "../components/Verification/VerificationComp";

const Verify = () => {
    const verificationStatus = useSelector(
        (state: RootState) => state.auth.verified
    );
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!verificationStatus) {
            authService.updateEmailVerification().then((res) => {
                console.log(res);
                dispatch(setVerificationStatus({ verified: true }));
                setIsLoading(false);
            });
        }
    }, []);

    if (verificationStatus)
        return <div className="text-center mt-6">Your Email is Verified...</div>;

    return (
        !isLoading && (
            <div className="text-center mt-6">
                Unable to Verify the Email...
                <VerificationComp />
            </div>
        )
    );
};

export default Verify;
