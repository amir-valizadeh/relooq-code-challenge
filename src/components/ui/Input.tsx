import React, {type InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    required?: boolean;
}

export const Input: React.FC<InputProps> = ({
        label,
        error,
        required,
        className = '',
        ...props
    }) => {
    return (
        <div className="mb-4">
            {label && (
                <label className="block text-gray-700 text-right mb-2">
                    {label}
                    {required && <span className="text-red-500 mr-1">*</span>}
                </label>
            )}
            <input
                className={`w-full p-2 border ${
                    error ? 'border-red-500' : 'border-gray-300'
                } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
                dir="rtl"
                {...props}
            />
            {error && <p className="text-red-500 text-sm mt-1 text-right">{error}</p>}
        </div>
    );
};
