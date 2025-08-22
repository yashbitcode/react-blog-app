import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import authService from "../../../appwrite/auth";
import { useDispatch } from "react-redux";
import { login } from "../../../store/authSlice";
import { useNavigate } from "react-router-dom";
import { CustomButton, CustomInput } from "../../../custom-components";

type Inputs = {
    email: string;
    password: string;
};

const Login = () => {
    const { register, handleSubmit } = useForm<Inputs>();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [loginError, setLoginError] = useState("");

    const handleLogin: SubmitHandler<Inputs> = async (data) => {
        setLoginError("");

        try {
            const session = await authService.loginAccount(data);

            if (session) {
                const currUser = await authService.getCurrentUser();

                if (currUser) {
                    dispatch(login(currUser));
                    navigate("/");
                }
            }
        } catch (err) {
            setLoginError(err.message);
        }
    };

    return (
        <form onSubmit={handleSubmit(handleLogin)}>
            <CustomInput
                type="email"
                label="Email"
                placeholder="Enter Email Address"
                {...register("email", {
                    required: true,
                    pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid Email Address",
                    },
                })}
            />

            <CustomInput
                type="password"
                placeholder="Enter Password"
                label="Password"
                {...register("password", {
                    required: true,
                    minLength: {
                        value: 8,
                        message: "Password must be at least 8 characters long",
                    },
                    pattern: {
                        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                        message:
                            "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
                    },
                })}
            />

            <CustomButton type="submit">Sign In</CustomButton>

            {loginError && <span className="bg-red-500">{loginError}</span>}
        </form>
    );
};

export default Login;
