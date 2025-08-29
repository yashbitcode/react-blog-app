import React, { useId } from "react";
import { twMerge } from "tailwind-merge";
import type { CustomInputInterface } from "../types/types";

const CustomInput = (
    { label, type = "text", className, id, ref, errorMsg, ...props }: CustomInputInterface
) => {
    const defaultId = useId();

    return (
        <div>
            {label && <label htmlFor={id || defaultId}>{label}</label>}
            <input
                id={id || defaultId}
                ref={ref}
                type={type}
                className={twMerge("w-full px-3 py-2 rounded-md border", className)}
                {...props}
            />
            {
                errorMsg && (
                <span className="mt-2 text-sm text-red-500">{errorMsg}</span>
                )
            }
        </div>
    );
};

export default CustomInput;
