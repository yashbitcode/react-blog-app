import { useForm, type SubmitHandler } from "react-hook-form";
import { CustomButton, CustomInput } from "../../../custom-components";
import authService from "../../../appwrite/auth";
import { useState } from "react";
import { Link } from "react-router-dom";
import { getErrorMessage } from "../../../utils/helpers";

type Inputs = {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
};

const SignUp = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<Inputs>();

    const [signUpError, setSignUpError] = useState("");

    const password = watch("password");

    const handleSignUp: SubmitHandler<Inputs> = async (data) => {
        const { name, email, password } = data;
        try {
            await authService.createAccount({
                name,
                email,
                password,
            });
        } catch (err) {
            setSignUpError(getErrorMessage(err));
        }
    };

    return (
        <div>
            <span>
                Already have an Account?&nbsp;
                <Link to="/login" className="underline">
                    Sign In
                </Link>
            </span>
            <form
                onSubmit={handleSubmit(handleSignUp)}
                className="flex flex-col gap-4"
            >
                <CustomInput
                    type="text"
                    label="Fullname"
                    placeholder="Enter fullname"
                    {...register("name", {
                        required: "name is required",
                    })}
                    errorMsg={errors.name?.message}
                />

                <CustomInput
                    type="email"
                    label="Email"
                    placeholder="Enter email"
                    {...register("email", {
                        required: "Email Required",
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "Invalid Email Address",
                        },
                    })}
                    errorMsg={errors.email?.message}
                />

                <CustomInput
                    type="password"
                    placeholder="Enter Password"
                    label="Password"
                    {...register("password", {
                        required: "Password Required",
                        minLength: {
                            value: 8,
                            message:
                                "Password must be at least 8 characters long",
                        },
                        // pattern: {
                        //     value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                        //     message:
                        //         "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
                        // },
                    })}
                    errorMsg={errors.password?.message}
                />

                <CustomInput
                    type="password"
                    placeholder="Enter Confirm Password"
                    label="Confirm Password"
                    {...register("confirmPassword", {
                        required: "Confirm Password required",
                        validate: (value) =>
                            value === password || "Passwords do not match",
                    })}
                    errorMsg={errors.confirmPassword?.message}
                />

                <CustomButton type="submit">Sign Up</CustomButton>

                {signUpError && (
                    <span className="bg-red-500">{signUpError}</span>
                )}
            </form>
        </div>
    );
};

export default SignUp;
