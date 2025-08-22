import React, { useId } from "react";
import { twMerge } from "tailwind-merge";
import type { CustomInputInterface } from "../types/types";

const CustomInput = (
    { label, type = "text", className, id, ref, ...props }: CustomInputInterface
) => {
    const defaultId = useId();

    return (
        <div>
            {label && <label htmlFor={id || defaultId}>{label}</label>}
            <input
                id={id || defaultId}
                ref={ref}
                type={type}
                className={twMerge("w-full px-3 py-2 rounded-md", className)}
                {...props}
            />
        </div>
    );
};

export default CustomInput;
