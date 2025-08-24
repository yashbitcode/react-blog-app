import { useId } from "react";
import type { CustomSelectInterface } from "../types/types";
import { twMerge } from "tailwind-merge";

const CustomSelect = ({
    options,
    className,
    label,
    id,
    ref,
    errorMsg,
    ...props
}: CustomSelectInterface) => {
    const defaultId = useId();

    return (
        <div>
            {label && <label htmlFor={id || defaultId}>{label}</label>}
            <select
                id={id || defaultId}
                ref={ref}
                {...props}
                className={twMerge("", className)}
            >
                {options.map((el) => (
                    <option key={el} value={el}>
                        {el}
                    </option>
                ))}
            </select>
            {errorMsg && (
                <span className="mt-2 text-sm bg-red-500">{errorMsg}</span>
            )}
        </div>
    );
};

export default CustomSelect;
