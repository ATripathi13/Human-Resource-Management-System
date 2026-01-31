import React from 'react';

const Input = ({ label, id, type = "text", register, errors, ...props }) => {
    return (
        <div className="mb-4">
            {label && <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>}
            <input
                id={id}
                type={type}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${errors && errors[id] ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300'
                    }`}
                {...props}
                {...(register ? register(id) : {})} // Support react-hook-form if used, or standard props
            />
            {errors && errors[id] && (
                <p className="mt-1 text-sm text-red-600">{errors[id].message}</p>
            )}
        </div>
    );
};

export default Input;
