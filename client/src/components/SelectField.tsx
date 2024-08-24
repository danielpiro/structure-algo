import React from "react";
import Select, { StylesConfig } from "react-select";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectFieldProps {
  label: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
}

const SelectField: React.FC<SelectFieldProps> = ({
  label,
  options,
  value,
  onChange,
}) => {
  const selectOptions: SelectOption[] = options.map((option) => ({
    value: option,
    label: option,
  }));

  const customStyles: StylesConfig<SelectOption, false> = {
    control: (provided) => ({
      ...provided,
      borderColor: "#e2e8f0",
      "&:hover": { borderColor: "#cbd5e0" },
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? "#4a5568" : "white",
      color: state.isSelected ? "white" : "#4a5568",
      "&:hover": { backgroundColor: state.isSelected ? "#4a5568" : "#f7fafc" },
    }),
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <Select<SelectOption>
        options={selectOptions}
        value={{ value, label: value }}
        onChange={(option) => onChange(option?.value || "")}
        isRtl={true}
        className="text-sm"
        styles={customStyles}
      />
    </div>
  );
};

export default SelectField;
