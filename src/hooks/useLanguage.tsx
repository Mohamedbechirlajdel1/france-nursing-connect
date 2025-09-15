import React, { createContext, useContext, useState } from 'react';

type Language = 'fr' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  fr: {
    // Header
    title: 'Candidature Soignant France',
    subtitle: 'Postulez pour travailler comme infirmier ou aide-soignant en France',
    languageToggle: 'English',
    
    // Personal Information
    personalInfo: 'Informations personnelles',
    fullName: 'Nom complet',
    dateOfBirth: 'Date de naissance',
    gender: 'Sexe',
    male: 'Homme',
    female: 'Femme',
    other: 'Autre',
    nationality: 'Nationalité',
    currentCountry: 'Pays de résidence actuel',
    phone: 'WhatsApp',
    email: 'Email',
    
    // Professional Information
    professionalInfo: 'Informations professionnelles',
    profession: 'Profession',
    nurse: 'Infirmier/Infirmière',
    caregiver: 'Aide-soignant(e)',
    experience: 'Années d\'expérience',
    currentEmployer: 'Employeur actuel (optionnel)',
    specializedSkills: 'Compétences spécialisées / Services',
    languagesSpoken: 'Langues parlées',
    
    // Documents
    documents: 'Documents',
    uploadCV: 'Télécharger CV (PDF/DOC)',
    uploadDiploma: 'Diplôme / Certificat infirmier',
    uploadID: 'Copie pièce d\'identité/passeport',
    
    // Availability
    availability: 'Disponibilité et préférences',
    availableFrom: 'Disponible à partir du',
    preferredRegion: 'Région préférée en France (optionnel)',
    contractType: 'Type de contrat',
    cdd: 'CDD (Contrat à durée déterminée)',
    cdi: 'CDI (Contrat à durée indéterminée)',
    interim: 'Intérim',
    
    // Consent
    gdprConsent: 'J\'accepte que mes données personnelles soient collectées et traitées à des fins de recrutement conformément au RGPD.',
    
    // Actions
    submit: 'Postuler maintenant',
    contactInfo: 'Notre équipe de recrutement vous contactera après examen de votre profil.',
    
    // Validation
    required: 'Ce champ est requis',
    invalidEmail: 'Email invalide',
    invalidPhone: 'Numéro WhatsApp invalide',
    
    // Skills options
    icu: 'Soins intensifs (USI)',
    surgery: 'Chirurgie',
    pediatrics: 'Pédiatrie',
    elderly: 'Gériatrie',
    emergency: 'Urgences',
    psychiatry: 'Psychiatrie',
    maternity: 'Maternité',
    oncology: 'Oncologie',
  },
  en: {
    // Header
    title: 'Healthcare Worker Application France',
    subtitle: 'Apply to work as a nurse or healthcare assistant in France',
    languageToggle: 'Français',
    
    // Personal Information
    personalInfo: 'Personal Information',
    fullName: 'Full Name',
    dateOfBirth: 'Date of Birth',
    gender: 'Gender',
    male: 'Male',
    female: 'Female',
    other: 'Other',
    nationality: 'Nationality',
    currentCountry: 'Current Country of Residence',
    phone: 'WhatsApp',
    email: 'Email',
    
    // Professional Information
    professionalInfo: 'Professional Information',
    profession: 'Profession',
    nurse: 'Nurse',
    caregiver: 'Healthcare Assistant',
    experience: 'Years of Experience',
    currentEmployer: 'Current Employer (optional)',
    specializedSkills: 'Specialized Skills / Departments',
    languagesSpoken: 'Languages Spoken',
    
    // Documents
    documents: 'Documents',
    uploadCV: 'Upload CV (PDF/DOC)',
    uploadDiploma: 'Diploma / Nursing Certificate',
    uploadID: 'ID/Passport Copy',
    
    // Availability
    availability: 'Availability & Preferences',
    availableFrom: 'Available from',
    preferredRegion: 'Preferred region in France (optional)',
    contractType: 'Contract Type',
    cdd: 'Fixed-term Contract (CDD)',
    cdi: 'Permanent Contract (CDI)',
    interim: 'Temporary (Interim)',
    
    // Consent
    gdprConsent: 'I consent to my personal data being collected and processed for recruitment purposes in accordance with GDPR.',
    
    // Actions
    submit: 'Apply Now',
    contactInfo: 'Our recruitment team will contact you after reviewing your profile.',
    
    // Validation
    required: 'This field is required',
    invalidEmail: 'Invalid email',
    invalidPhone: 'Invalid WhatsApp number',
    
    // Skills options
    icu: 'Intensive Care Unit (ICU)',
    surgery: 'Surgery',
    pediatrics: 'Pediatrics',
    elderly: 'Elderly Care',
    emergency: 'Emergency',
    psychiatry: 'Psychiatry',
    maternity: 'Maternity',
    oncology: 'Oncology',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('fr');
  
  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['fr']] || key;
  };
  
  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};