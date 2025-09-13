import { useState } from "react";

const Select = ({
    options,
    value,
    onChange,
}: {
    options: { value: string; label: string }[];
    value: string;
    onChange: (value: string) => void;
}) => {
    const [selectedValue, setSelectedValue] = useState(value);
    
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        setSelectedValue(value);
        onChange(value);
    };

    const baseStyle = "border border-gray-200 px-4 py-2 rounded-xl focus:ring-2 focus:ring-blue-400 outline-none shadow-sm";

    return (
        <select value={selectedValue} onChange={handleChange} className={baseStyle}>
            {options.map((option: { value: string; label: string }) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    )
}

export default Select