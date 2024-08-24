import React, { useState, useCallback, useMemo } from "react";
import { LayerType } from "../types";
import useTranslations from "../hooks/useTranslations";
import { FaFolderOpen, FaSave } from "react-icons/fa";

interface SavedModelsManagerProps {
  savedModels: { [key: string]: LayerType[] };
  onSaveModel: (modelName: string) => void;
  onLoadModel: (modelName: string) => void;
}

const SavedModelsManager: React.FC<SavedModelsManagerProps> = React.memo(
  ({ savedModels, onSaveModel, onLoadModel }) => {
    const [newModelName, setNewModelName] = useState("");
    const [selectedModel, setSelectedModel] = useState("");
    const { t } = useTranslations();

    const handleSave = useCallback(() => {
      if (newModelName) {
        onSaveModel(newModelName);
        setNewModelName("");
      }
    }, [newModelName, onSaveModel]);

    const handleLoad = useCallback(() => {
      if (selectedModel) {
        onLoadModel(selectedModel);
      }
    }, [selectedModel, onLoadModel]);

    const modelOptions = useMemo(
      () =>
        Object.keys(savedModels).map((modelName) => (
          <option key={modelName} value={modelName}>
            {modelName}
          </option>
        )),
      [savedModels]
    );

    return (
      <div className="mt-10 bg-gradient-to-r from-blue-50 to-indigo-50 p-8 rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-indigo-800">
          {t("Saved Models")}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-indigo-700">
              {t("Save Current Model")}
            </h3>
            <div className="flex gap-2">
              <input
                type="text"
                value={newModelName}
                onChange={(e) => setNewModelName(e.target.value)}
                placeholder={t("Enter model name")}
                className="flex-1 p-3 border border-indigo-200 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
              <button
                onClick={handleSave}
                className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 rounded-md hover:from-blue-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transition duration-300 ease-in-out flex items-center"
              >
                {t("Save")} <FaSave className="mr-2" />
              </button>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-indigo-700">
              {t("Load Saved Model")}
            </h3>
            <div className="flex gap-2">
              <select
                value={selectedModel}
                onChange={(e) => setSelectedModel(e.target.value)}
                className="flex-1 p-3 border border-indigo-200 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="">{t("Select a model")}</option>
                {modelOptions}
              </select>
              <button
                onClick={handleLoad}
                className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-md hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition duration-300 ease-in-out flex items-center"
              >
                {t("Load")} <FaFolderOpen className="mr-2" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

export default SavedModelsManager;
