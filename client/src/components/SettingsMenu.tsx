import React, { useState } from 'react';
import { Settings, Save, FolderOpen } from 'lucide-react';
import { LayerType } from '../types';
import useTranslations from '../hooks/useTranslations';

interface SettingsMenuProps {
  projectType: string;
  projectLocation: string;
  onProjectTypeChange: (value: string) => void;
  onProjectLocationChange: (value: string) => void;
  modelType: string;
  isolationType: string;
  wallColor: string;
  onModelTypeChange: (value: string) => void;
  onIsolationTypeChange: (value: string) => void;
  onWallColorChange: (value: string) => void;
  savedModels: { [key: string]: LayerType[] };
  onSaveModel: (modelName: string) => void;
  onLoadModel: (modelName: string) => void;
}

interface SelectFieldProps {
  label: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
}

const SelectField: React.FC<SelectFieldProps> = ({ label, options, value, onChange }) => (
  <div className="space-y-2">
    <label className="block text-sm font-medium text-gray-700">{label}</label>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
    >
      <option value="">בחר אופציה</option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  </div>
);

const SettingsMenu: React.FC<SettingsMenuProps> = ({
  projectType,
  projectLocation,
  onProjectTypeChange,
  onProjectLocationChange,
  modelType,
  isolationType,
  wallColor,
  onModelTypeChange,
  onIsolationTypeChange,
  onWallColorChange,
  savedModels,
  onSaveModel,
  onLoadModel
}) => {
  const [activeDialog, setActiveDialog] = useState<string | null>(null);
  const [newModelName, setNewModelName] = useState<string>('');
  const [selectedModel, setSelectedModel] = useState<string>('');
  
  // Temporary state for form values
  const [tempProjectType, setTempProjectType] = useState(projectType);
  const [tempProjectLocation, setTempProjectLocation] = useState(projectLocation);
  const [tempModelType, setTempModelType] = useState(modelType);
  const [tempIsolationType, setTempIsolationType] = useState(isolationType);
  const [tempWallColor, setTempWallColor] = useState(wallColor);
  const { t } = useTranslations();

  // Reset temporary states when opening modal
  const openDialog = (dialogName: string) => {
    setTempProjectType(projectType);
    setTempProjectLocation(projectLocation);
    setTempModelType(modelType);
    setTempIsolationType(isolationType);
    setTempWallColor(wallColor);
    setActiveDialog(dialogName);
  };

  const handleSave = (): void => {
    if (newModelName) {
      onSaveModel(newModelName);
      setNewModelName('');
      setActiveDialog(null);
    }
  };

  const handleLoad = (): void => {
    if (selectedModel) {
      onLoadModel(selectedModel);
      setSelectedModel('');
      setActiveDialog(null);
    }
  };

  const handleProjectSettingsSave = () => {
    onProjectTypeChange(tempProjectType);
    onProjectLocationChange(tempProjectLocation);
    setActiveDialog(null);
  };

  const handleModelSettingsSave = () => {
    onModelTypeChange(tempModelType);
    onIsolationTypeChange(tempIsolationType);
    onWallColorChange(tempWallColor);
    setActiveDialog(null);
  };

  return (
    <div className="w-full flex justify-center mb-8 mt-4">
      <div className="bg-white/80 backdrop-blur-sm px-6 py-3 rounded-xl shadow-lg border border-gray-200">
        <div className="flex gap-3">
          <button
            className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm active:scale-95"
            onClick={() => openDialog('projectSettings')}
          >
            <Settings className="h-4 w-4 text-blue-600" />
            <span className="text-sm font-medium text-gray-700">{t('Project Settings')}</span>
          </button>

          <button
            className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm active:scale-95"
            onClick={() => openDialog('modelSettings')}
          >
            <Settings className="h-4 w-4 text-purple-600" />
            <span className="text-sm font-medium text-gray-700">{t('Model Settings')}</span>
          </button>

          <button
            className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm active:scale-95"
            onClick={() => openDialog('savedModels')}
          >
            <Save className="h-4 w-4 text-green-600" />
            <span className="text-sm font-medium text-gray-700">{t('Saved Models')}</span>
          </button>
        </div>
      </div>

      {/* Modal Backdrop */}
      {activeDialog && (
        <div 
          className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-25 backdrop-blur-sm"
          onClick={() => {
            if (activeDialog === 'projectSettings') handleProjectSettingsSave();
            else if (activeDialog === 'modelSettings') handleModelSettingsSave();
            else setActiveDialog(null);
          }}
        >
          <div className="flex min-h-screen items-center justify-center p-4">
            {/* Project Settings Dialog */}
            {activeDialog === 'projectSettings' && (
              <div className="relative bg-white rounded-xl shadow-xl max-w-md w-full p-6" onClick={e => e.stopPropagation()}>
                <div className="mb-4 flex justify-between items-center">
                  <h3 className="text-xl font-semibold text-gray-900">{t('Project Settings')}</h3>
                  <button
                    onClick={handleProjectSettingsSave}
                    className="text-gray-400 hover:text-gray-500 transition-colors p-1 hover:bg-gray-100 rounded-full"
                  >
                    <span className="sr-only">{t('Close')}</span>
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <div className="space-y-4">
                  <SelectField
                    label={t('Project Type')}
                    options={["מגורים", "משרדים", "מסחר"]}
                    value={tempProjectType}
                    onChange={setTempProjectType}
                  />
                  <SelectField
                    label=
                    {t('Project Location')}
                    options={["א", "ב", "ג", "ד"]}
                    value={tempProjectLocation}
                    onChange={setTempProjectLocation}
                  />
                  <div className="flex justify-end mt-6">
                    <button
                      onClick={handleProjectSettingsSave}
                      className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors active:scale-95"
                    >
                      <Save className="h-4 w-4" />
                      {t('Save Changes')}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Model Settings Dialog */}
            {activeDialog === 'modelSettings' && (
              <div className="relative bg-white rounded-xl shadow-xl max-w-md w-full p-6" onClick={e => e.stopPropagation()}>
                <div className="mb-4 flex justify-between items-center">
                  <h3 className="text-xl font-semibold text-gray-900"> {t('Model Settings')}</h3>
                  <button
                    onClick={handleModelSettingsSave}
                    className="text-gray-400 hover:text-gray-500 transition-colors p-1 hover:bg-gray-100 rounded-full"
                  >
                    <span className="sr-only">Close</span>
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <div className="space-y-4">
                  <SelectField
                    label={t('Model Type')}
                    options={["קיר חוץ", "קיר הפרדה", "גג עליון"]}
                    value={tempModelType}
                    onChange={setTempModelType}
                  />
                  <SelectField
                    label={t('Isolation Type')}
                    options={["בידוד חוץ", "בידוד פנים"]}
                    value={tempIsolationType}
                    onChange={setTempIsolationType}
                  />
                  {tempModelType === "קיר חוץ" && (
                    <SelectField
                      label={t('Wall Color')}
                      options={["גוון בהיר", "גוון כהה"]}
                      value={tempWallColor}
                      onChange={setTempWallColor}
                    />
                  )}
                  <div className="flex justify-end mt-6">
                    <button
                      onClick={handleModelSettingsSave}
                      className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors active:scale-95"
                    >
                      <Save className="h-4 w-4" />
                      {t('Save Changes')}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Saved Models Dialog */}
            {activeDialog === 'savedModels' && (
              <div className="relative bg-white rounded-xl shadow-xl max-w-md w-full p-6" onClick={e => e.stopPropagation()}>
                <div className="mb-4 flex justify-between items-center">
                  <h3 className="text-xl font-semibold text-gray-900">{t('Saved Models')}</h3>
                  <button
                    onClick={() => setActiveDialog(null)}
                    className="text-gray-400 hover:text-gray-500 transition-colors p-1 hover:bg-gray-100 rounded-full"
                  >
                    <span className="sr-only">{t('Close')}</span>
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">{t('Save Current Model')}</h3>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={newModelName}
                        onChange={(e) => setNewModelName(e.target.value)}
                        placeholder={t('Enter model name')}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                      <button
                        onClick={handleSave}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={!newModelName}
                      >
                        <Save className="h-4 w-4" />
                        {t('Save')}
                      </button>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900"> {t('Load Saved Model')}</h3>
                    <div className="flex gap-2">
                      <select
                        value={selectedModel}
                        onChange={(e) => setSelectedModel(e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="">{t('Select a model')}</option>
                        {Object.keys(savedModels).map((modelName) => (
                          <option key={modelName} value={modelName}>
                            {modelName}
                          </option>
                        ))}
                      </select>
                      <button
                        onClick={handleLoad}
                        className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={!selectedModel}
                      >
                        <FolderOpen className="h-4 w-4" />
                        {t('Load')}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingsMenu;