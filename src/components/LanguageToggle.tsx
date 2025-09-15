import React from 'react';
import { Button } from '@/components/ui/button';
import { Languages } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';

export const LanguageToggle: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();
  
  const toggleLanguage = () => {
    setLanguage(language === 'fr' ? 'en' : 'fr');
  };

  return (
    <Button
      onClick={toggleLanguage}
      variant="outline"
      size="sm"
      className="flex items-center gap-2 border-medical-blue text-medical-blue hover:bg-medical-blue-light"
    >
      <Languages className="h-4 w-4" />
      {t('languageToggle')}
    </Button>
  );
};