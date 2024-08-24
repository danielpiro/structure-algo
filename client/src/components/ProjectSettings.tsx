import React from "react";
import Select from "react-select";
import useTranslations from "../hooks/useTranslations";

interface ProjectSettingsProps {
  projectType: string;
  projectLocation: string;
  onProjectTypeChange: (value: string) => void;
  onProjectLocationChange: (value: string) => void;
}

const projectTypes = ["מגורים", "משרדים", "מסחר"];
const projectLocations = ["א", "ב", "ג", "ד"];

const ProjectSettings: React.FC<ProjectSettingsProps> = ({
  projectType,
  projectLocation,
  onProjectTypeChange,
  onProjectLocationChange,
}) => {
  const { t } = useTranslations();

  const customStyles = {
    control: (provided: any) => ({
      ...provided,
      borderColor: "#e2e8f0",
      "&:hover": {
        borderColor: "#cbd5e0",
      },
    }),
    option: (provided: any, state: { isSelected: any }) => ({
      ...provided,
      backgroundColor: state.isSelected ? "#805ad5" : "white",
      color: state.isSelected ? "white" : "#4a5568",
      "&:hover": {
        backgroundColor: state.isSelected ? "#805ad5" : "#f7fafc",
      },
    }),
  };

  return (
    <div className="bg-gradient-to-r from-purple-100 to-purple-50 p-8 rounded-xl shadow-lg mb-8">
      <h2 className="text-3xl font-bold mb-6 text-purple-800">
        {t("Project Settings")}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-2">
          <label className="block text-lg font-medium text-purple-700 mb-2">
            {t("Project Type")}
          </label>
          <Select
            options={projectTypes.map((type) => ({ value: type, label: type }))}
            value={{ value: projectType, label: projectType }}
            onChange={(option) => onProjectTypeChange(option?.value || "")}
            isRtl={true}
            styles={customStyles}
            className="text-lg"
          />
        </div>
        <div className="space-y-2">
          <label className="block text-lg font-medium text-purple-700 mb-2">
            {t("Project Location")}
          </label>
          <Select
            options={projectLocations.map((location) => ({
              value: location,
              label: location,
            }))}
            value={{ value: projectLocation, label: projectLocation }}
            onChange={(option) => onProjectLocationChange(option?.value || "")}
            isRtl={true}
            styles={customStyles}
            className="text-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default ProjectSettings;
