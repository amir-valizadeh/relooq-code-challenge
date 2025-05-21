import React from 'react';

interface RadioGroupProps {
    options: string[];
    name: string;
    value?: number;
    onChange: (value: number) => void;
    label?: string;
    required?: boolean;
    error?: string;
}

export const RadioGroup: React.FC<RadioGroupProps> = ({
          options,
          name,
          value,
          onChange,
          label,
          required,
          error,
      }) => {
    return (
        <div className="mb-4">
            {label && (
                <div className="block text-gray-700 text-right mb-2">
                    {label}
                    {required && <span className="text-red-500 mr-1">*</span>}
                </div>
            )}
            <div className="space-y-2">
                {options.map((option, index) => (
                    <div key={index} className="flex items-center justify-end">
                        <label
                            htmlFor={`${name}-${index}`}
                            className="text-gray-700 mr-2 cursor-pointer"
                        >
                            {option}
                        </label>
                        <input
                            type="radio"
                            id={`${name}-${index}`}
                            name={name}
                            checked={value === index}
                            onChange={() => onChange(index)}
                            className="ml-2 cursor-pointer"
                        />
                    </div>
                ))}
            </div>
            {error && <p className="text-red-500 text-sm mt-1 text-right">{error}</p>}
        </div>
    );
};