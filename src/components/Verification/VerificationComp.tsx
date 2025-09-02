import authService from "../../appwrite/auth";
import { CustomButton } from "../../custom-components";

const VerificationComp = () => {
    return (
        <div className="text-center mt-10 flex gap-2 items-center justify-center">
            <span>Please verify your email to access this feature.</span>
            <CustomButton
            className="w-fit"
                onClick={() =>
                    authService.sendVerificationEmail(
                        "http://localhost:5173/verify"
                    )
                }
            >
                Verify Now
            </CustomButton>
        </div>
    );
};

export default VerificationComp;