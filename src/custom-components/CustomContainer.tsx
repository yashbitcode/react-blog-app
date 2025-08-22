import { twMerge } from 'tailwind-merge'
import type { CustomContainerInterface } from '../types/types';

const CustomContainer = ({
    className,
    children,
    ...props
}: CustomContainerInterface) => {
    return (
        <div className={twMerge("w-full max-w-7xl px-4 mx-auto", className)} {...props}>{children}</div>
    );
};

export default CustomContainer;