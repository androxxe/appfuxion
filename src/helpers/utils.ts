import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const sleep = async (seconds: number) => {
    setTimeout(() => {
        return Promise.resolve();
    }, seconds * 1000);
};

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}
