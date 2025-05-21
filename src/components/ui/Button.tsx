// src/components/ui/Button.tsx
import React, {type ButtonHTMLAttributes } from 'react';
import { motion } from 'framer-motion';
import { buttonHoverVariants } from '../../utils/animations';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'success' | 'danger';
}

export const Button: React.FC<ButtonProps> = ({
                                                  children,
                                                  variant = 'primary',
                                                  className = '',
                                                  disabled,
                                                  ...props
                                              }) => {
    const baseClasses = 'px-4 py-2 rounded-md transition duration-200';

    const variantClasses = {
        primary: disabled
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
            : 'bg-blue-500 text-white hover:bg-blue-600',
        secondary: disabled
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
            : 'bg-gray-500 text-white hover:bg-gray-600',
        success: disabled
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
            : 'bg-green-500 text-white hover:bg-green-600',
        danger: disabled
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
            : 'bg-red-500 text-white hover:bg-red-600',
    };

    if (disabled) {
        return (
            <button
                className={`${baseClasses} ${variantClasses[variant]} ${className}`}
                disabled={true}
                {...props}
            >
                {children}
            </button>
        );
    }

    return (
        <motion.button
            className={`${baseClasses} ${variantClasses[variant]} ${className}`}
            disabled={false}
            variants={buttonHoverVariants}
            initial="initial"
            whileHover="hover"
            whileTap="tap"
            onClick={props.onClick}
            type={props.type}
        >
            {children}
        </motion.button>
    );
};