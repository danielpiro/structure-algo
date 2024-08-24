import { useCallback } from "react";
import translations from "../translations.json";

type TranslationKey = keyof typeof translations;

const useTranslations = () => {
  const t = useCallback((key: TranslationKey): string => {
    const translation = translations[key];
    if (translation === undefined) {
      console.warn(`Translation key not found: ${key}`);
      return key;
    }
    return translation;
  }, []);

  return { t };
};

export default useTranslations;
