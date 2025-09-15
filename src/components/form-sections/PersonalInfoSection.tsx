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

export const PersonalInfoSection: React.FC = () => {
  const { control } = useFormContext();
  const { t } = useLanguage();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <FormField
        control={control}
        name="fullName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t('fullName')}</FormLabel>
            <FormControl>
              <Input placeholder={t('fullName')} {...field} className="h-11" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="dateOfBirth"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t('dateOfBirth')}</FormLabel>
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
                    {field.value ? format(field.value, "PPP") : t('dateOfBirth')}
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={field.value}
                  onSelect={field.onChange}
                  disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
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
        name="gender"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t('gender')}</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger className="h-11">
                  <SelectValue placeholder={t('gender')} />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="male">{t('male')}</SelectItem>
                <SelectItem value="female">{t('female')}</SelectItem>
                <SelectItem value="other">{t('other')}</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="nationality"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t('nationality')}</FormLabel>
            <FormControl>
              <Input placeholder={t('nationality')} {...field} className="h-11" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="currentCountry"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t('currentCountry')}</FormLabel>
            <FormControl>
              <Input placeholder={t('currentCountry')} {...field} className="h-11" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="phone"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t('phone')}</FormLabel>
            <FormControl>
              <Input 
                placeholder="WhatsApp: +33 6 12 34 56 78" 
                {...field} 
                className="h-11"
                type="tel"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="email"
        render={({ field }) => (
          <FormItem className="md:col-span-2">
            <FormLabel>{t('email')}</FormLabel>
            <FormControl>
              <Input 
                placeholder="exemple@email.com" 
                {...field} 
                className="h-11"
                type="email"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};