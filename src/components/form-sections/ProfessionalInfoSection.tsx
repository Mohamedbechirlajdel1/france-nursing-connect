import React from 'react';
import { useFormContext } from 'react-hook-form';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { useLanguage } from '@/hooks/useLanguage';

export const ProfessionalInfoSection: React.FC = () => {
  const { control, watch, setValue } = useFormContext();
  const { t } = useLanguage();

  const specializedSkills = [
    { id: 'icu', label: t('icu') },
    { id: 'surgery', label: t('surgery') },
    { id: 'pediatrics', label: t('pediatrics') },
    { id: 'elderly', label: t('elderly') },
    { id: 'emergency', label: t('emergency') },
    { id: 'psychiatry', label: t('psychiatry') },
    { id: 'maternity', label: t('maternity') },
    { id: 'oncology', label: t('oncology') },
  ];

  const languages = [
    'Français', 'English', 'Español', 'Deutsch', 'Italiano', 
    'العربية', 'Português', 'Polski', 'Română', 'Русский'
  ];

  const watchedSkills = watch('specializedSkills') || [];
  const watchedLanguages = watch('languagesSpoken') || [];

  const handleSkillChange = (skillId: string, checked: boolean) => {
    const currentSkills = watchedSkills;
    if (checked) {
      setValue('specializedSkills', [...currentSkills, skillId]);
    } else {
      setValue('specializedSkills', currentSkills.filter((id: string) => id !== skillId));
    }
  };

  const handleLanguageChange = (language: string, checked: boolean) => {
    const currentLanguages = watchedLanguages;
    if (checked) {
      setValue('languagesSpoken', [...currentLanguages, language]);
    } else {
      setValue('languagesSpoken', currentLanguages.filter((lang: string) => lang !== language));
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={control}
          name="profession"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('profession')}</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="h-11">
                    <SelectValue placeholder={t('profession')} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="nurse">{t('nurse')}</SelectItem>
                  <SelectItem value="caregiver">{t('caregiver')}</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="experience"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('experience')}</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="h-11">
                    <SelectValue placeholder={t('experience')} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="0-1">0-1 ans</SelectItem>
                  <SelectItem value="2-5">2-5 ans</SelectItem>
                  <SelectItem value="6-10">6-10 ans</SelectItem>
                  <SelectItem value="11-15">11-15 ans</SelectItem>
                  <SelectItem value="16+">16+ ans</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={control}
        name="currentEmployer"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t('currentEmployer')}</FormLabel>
            <FormControl>
              <Input placeholder={t('currentEmployer')} {...field} className="h-11" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Specialized Skills */}
      <div>
        <FormLabel className="text-base font-medium mb-4 block">{t('specializedSkills')}</FormLabel>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {specializedSkills.map((skill) => (
            <div key={skill.id} className="flex items-center space-x-2">
              <Checkbox
                id={skill.id}
                checked={watchedSkills.includes(skill.id)}
                onCheckedChange={(checked) => handleSkillChange(skill.id, checked as boolean)}
              />
              <label
                htmlFor={skill.id}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {skill.label}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Languages Spoken */}
      <div>
        <FormLabel className="text-base font-medium mb-4 block">{t('languagesSpoken')}</FormLabel>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {languages.map((language) => (
            <div key={language} className="flex items-center space-x-2">
              <Checkbox
                id={language}
                checked={watchedLanguages.includes(language)}
                onCheckedChange={(checked) => handleLanguageChange(language, checked as boolean)}
              />
              <label
                htmlFor={language}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {language}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};