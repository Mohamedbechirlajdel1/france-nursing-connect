import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form } from '@/components/ui/form';
import { Languages, Stethoscope, FileText, Calendar, MapPin, Shield } from 'lucide-react';
import { PersonalInfoSection } from './form-sections/PersonalInfoSection';
import { ProfessionalInfoSection } from './form-sections/ProfessionalInfoSection';
import { DocumentsSection } from './form-sections/DocumentsSection';
import { AvailabilitySection } from './form-sections/AvailabilitySection';
import { ConsentSection } from './form-sections/ConsentSection';
import { LanguageToggle } from './LanguageToggle';
import { useLanguage } from '@/hooks/useLanguage';
import { toast } from '@/hooks/use-toast';

const formSchema = z.object({
  // Personal Information
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  dateOfBirth: z.date({ required_error: 'Date of birth is required' }),
  gender: z.enum(['male', 'female', 'other'], { required_error: 'Gender is required' }),
  nationality: z.string().min(2, 'Nationality is required'),
  currentCountry: z.string().min(2, 'Current country is required'),
  phone: z.string().min(8, 'Phone number is required'),
  email: z.string().email('Invalid email address'),
  
  // Professional Information
  profession: z.enum(['nurse', 'caregiver'], { required_error: 'Profession is required' }),
  experience: z.string().min(1, 'Experience is required'),
  currentEmployer: z.string().optional(),
  specializedSkills: z.array(z.string()).min(1, 'Select at least one skill'),
  languagesSpoken: z.array(z.string()).min(1, 'Select at least one language'),
  
  // Documents (file paths would be handled separately)
  cvFile: z.any().optional(),
  diplomaFile: z.any().optional(),
  idFile: z.any().optional(),
  
  // Availability
  availableFrom: z.date({ required_error: 'Available date is required' }),
  preferredRegion: z.string().optional(),
  contractType: z.enum(['cdd', 'cdi', 'interim'], { required_error: 'Contract type is required' }),
  
  // Consent
  gdprConsent: z.boolean().refine((val) => val === true, 'You must accept the GDPR terms'),
});

type FormData = z.infer<typeof formSchema>;

export const HealthcareApplicationForm: React.FC = () => {
  const { t } = useLanguage();
  
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      specializedSkills: [],
      languagesSpoken: [],
      gdprConsent: false,
    },
  });

  const onSubmit = (data: FormData) => {
    console.log('Form submitted:', data);
    toast({
      title: "Application Submitted!",
      description: t('contactInfo'),
    });
  };

  const sections = [
    { icon: FileText, title: t('personalInfo'), component: PersonalInfoSection },
    { icon: Stethoscope, title: t('professionalInfo'), component: ProfessionalInfoSection },
    { icon: FileText, title: t('documents'), component: DocumentsSection },
    { icon: Calendar, title: t('availability'), component: AvailabilitySection },
    { icon: Shield, title: 'GDPR', component: ConsentSection },
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Stethoscope className="h-10 w-10 text-medical-blue" />
            <h1 className="text-4xl font-bold bg-gradient-medical bg-clip-text text-transparent">
              {t('title')}
            </h1>
          </div>
          <p className="text-xl text-medical-gray mb-6">{t('subtitle')}</p>
          <LanguageToggle />
        </div>

        {/* Form */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {sections.map((section, index) => {
              const IconComponent = section.icon;
              const SectionComponent = section.component;
              
              return (
                <Card key={index} className="shadow-medium border-0 bg-card/80 backdrop-blur-sm">
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center gap-3 text-xl">
                      <div className="p-2 rounded-lg bg-medical-blue-light">
                        <IconComponent className="h-5 w-5 text-medical-blue" />
                      </div>
                      {section.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <SectionComponent />
                  </CardContent>
                </Card>
              );
            })}

            {/* Submit Button */}
            <div className="text-center pt-6">
              <Button 
                type="submit" 
                size="lg"
                className="bg-gradient-medical hover:shadow-large transition-all duration-300 text-lg px-12 py-6"
              >
                {t('submit')}
              </Button>
              <p className="text-sm text-medical-gray mt-4">{t('contactInfo')}</p>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};