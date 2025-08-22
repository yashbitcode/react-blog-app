import { useNavigate } from "react-router-dom";
import { CustomButton } from "../../custom-components";
import authService from "../../appwrite/auth";
import { useDispatch } from "react-redux";
import { logout } from "../../store/authSlice";

const Logout = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const logoutaHandler = () => {
        authService.logoutUser()
        .then(() => {
            dispatch(logout());
            navigate("/");
        });
    };

    return (
        <CustomButton onClick={logoutaHandler}>Logout</CustomButton>
    );
};

export default Logout;