import React from 'react';
import { useFormContext } from 'react-hook-form';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useLanguage } from '@/hooks/useLanguage';
import { cn } from '@/lib/utils';

export const AvailabilitySection: React.FC = () => {
  const { control } = useFormContext();
  const { t } = useLanguage();

  const frenchRegions = [
    'Île-de-France', 'Provence-Alpes-Côte d\'Azur', 'Auvergne-Rhône-Alpes',
    'Occitanie', 'Nouvelle-Aquitaine', 'Grand Est', 'Hauts-de-France',
    'Normandie', 'Bretagne', 'Pays de la Loire', 'Centre-Val de Loire',
    'Bourgogne-Franche-Comté', 'Corse'
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <FormField
        control={control}
        name="availableFrom"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t('availableFrom')}</FormLabel>
            <Popover>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full h-11 justify-start text-left font-normal",
                      !field.value && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {field.value ? format(field.value, "PPP") : t('availableFrom')}
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={field.value}
                  onSelect={field.onChange}
                  disabled={(date) => date < new Date()}
                  initialFocus
                  className="p-3 pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="contractType"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t('contractType')}</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger className="h-11">
                  <SelectValue placeholder={t('contractType')} />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="cdd">{t('cdd')}</SelectItem>
                <SelectItem value="cdi">{t('cdi')}</SelectItem>
                <SelectItem value="interim">{t('interim')}</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="preferredRegion"
        render={({ field }) => (
          <FormItem className="md:col-span-2">
            <FormLabel>{t('preferredRegion')}</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger className="h-11">
                  <SelectValue placeholder={t('preferredRegion')} />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="no-preference">Aucune préférence</SelectItem>
                {frenchRegions.map((region) => (
                  <SelectItem key={region} value={region}>
                    {region}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};