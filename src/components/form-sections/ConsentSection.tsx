import React from 'react';
import { useFormContext } from 'react-hook-form';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import { Shield, ExternalLink } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';

export const ConsentSection: React.FC = () => {
  const { control } = useFormContext();
  const { t } = useLanguage();

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <div className="flex items-start space-x-3">
          <Shield className="h-6 w-6 text-medical-blue mt-1 flex-shrink-0" />
          <div className="space-y-3">
            <h3 className="font-semibold text-gray-900">Protection des données (RGPD)</h3>
            <div className="text-sm text-gray-700 space-y-2">
              <p>
                Vos données personnelles seront utilisées uniquement dans le cadre du processus de recrutement 
                et seront traitées conformément au Règlement Général sur la Protection des Données (RGPD).
              </p>
              <p>
                <strong>Données collectées :</strong> Informations personnelles, professionnelles, documents joints
              </p>
              <p>
                <strong>Finalité :</strong> Évaluation des candidatures et mise en relation avec les employeurs
              </p>
              <p>
                <strong>Conservation :</strong> 2 ans maximum après la fin du processus de recrutement
              </p>
              <p>
                <strong>Vos droits :</strong> Accès, rectification, suppression, opposition, portabilité
              </p>
            </div>
            <div className="pt-2">
              <a 
                href="#" 
                className="text-medical-blue hover:underline text-sm flex items-center gap-1"
              >
                Consulter notre politique de confidentialité
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>
        </div>
      </div>

      <FormField
        control={control}
        name="gdprConsent"
        render={({ field }) => (
          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
                className="mt-1"
              />
            </FormControl>
            <div className="space-y-1 leading-none">
              <FormLabel className="text-sm font-normal cursor-pointer">
                {t('gdprConsent')} <span className="text-red-500">*</span>
              </FormLabel>
              <FormMessage />
            </div>
          </FormItem>
        )}
      />
    </div>
  );
};