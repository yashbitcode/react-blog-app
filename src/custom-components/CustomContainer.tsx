import { twMerge } from 'tailwind-merge'
import type React from "react";

const CustomContainer = ({
    className,
    children
}: {
    className?: string;
    children: React.ReactNode;
}) => {
    return (
        <div className={twMerge("w-full max-w-7xl px-4 mx-auto", className)}>{children}</div>
    );
};

export default CustomContainer;