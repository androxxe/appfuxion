import {cva, type VariantProps} from "class-variance-authority";
import {Text, TouchableOpacity, TouchableOpacityProps} from "react-native";

import {cn} from "@/helpers/utils";

const buttonVariants = cva(
    "inline-flex items-center justify-center rounded-lg",
    {
        variants: {
            variant: {
                default: "bg-indigo-600",
                outlined: "bg-transparent border border-indigo-600",
            },
            size: {
                default: "py-3",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
);

interface ButtonProps
    extends TouchableOpacityProps,
        VariantProps<typeof buttonVariants> {
    isLoading?: boolean;
}

export default function Button(props: ButtonProps): JSX.Element {
    const {
        children,
        variant = "default",
        size,
        className,
        isLoading = false,
    } = props

    return (
        <TouchableOpacity
            className={cn(buttonVariants({variant, size, className}))}
            {...props}
        >
            <Text
                className={`${getTextVariantClassName({
                    variant,
                    size,
                })} font-semibold text-center`}
            >
                {isLoading ? "Loading..." : children}
            </Text>
        </TouchableOpacity>
    );
}

function getTextVariantClassName({
                                     variant,
                                 }: VariantProps<typeof buttonVariants>) {
    if (variant === "default") {
        return "text-white";
    }

    if (variant === "outlined") {
        return "text-indigo-600";
    }

    return "";
}
