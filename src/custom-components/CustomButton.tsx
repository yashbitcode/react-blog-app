import { twMerge } from "tailwind-merge";
import type { CustomButtonInterface } from "../types/types";

const CustomButton = ({
    children,
    className,
    type = "button",
    ...props
}: CustomButtonInterface) => {
    return (
        <button type={type} className={twMerge("w-full px-3 py-2 bg-neutral-700 text-white", className)} {...props}>{children}</button>
    ); 
};

export default CustomButton;