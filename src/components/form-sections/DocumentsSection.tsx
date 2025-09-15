import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { Upload, FileText, CheckCircle2, X } from 'lucide-react';
import { FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/hooks/useLanguage';

interface FileUploadProps {
  name: string;
  label: string;
  accept: string;
}

const FileUpload: React.FC<FileUploadProps> = ({ name, label, accept }) => {
  const { setValue, watch } = useFormContext();
  const [fileName, setFileName] = useState<string>('');
  const [isDragOver, setIsDragOver] = useState(false);

  const handleFileChange = (file: File | null) => {
    if (file) {
      setValue(name, file);
      setFileName(file.name);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileChange(files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const removeFile = () => {
    setValue(name, undefined);
    setFileName('');
  };

  return (
    <div className="space-y-2">
      <FormLabel>{label}</FormLabel>
      <div
        className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
          isDragOver
            ? 'border-medical-blue bg-medical-blue-light'
            : fileName
            ? 'border-medical-green bg-green-50'
            : 'border-gray-300 hover:border-medical-blue'
        }`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        {fileName ? (
          <div className="flex items-center justify-center space-x-2">
            <CheckCircle2 className="h-5 w-5 text-medical-green" />
            <span className="text-sm font-medium text-gray-700">{fileName}</span>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={removeFile}
              className="h-6 w-6 p-0 hover:bg-red-100"
            >
              <X className="h-4 w-4 text-red-500" />
            </Button>
          </div>
        ) : (
          <>
            <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
            <p className="text-sm text-gray-600 mb-2">
              Glissez-déposez votre fichier ici ou cliquez pour sélectionner
            </p>
            <input
              type="file"
              accept={accept}
              onChange={(e) => handleFileChange(e.target.files?.[0] || null)}
              className="hidden"
              id={name}
            />
            <label htmlFor={name}>
              <Button type="button" variant="outline" size="sm" className="cursor-pointer">
                <FileText className="h-4 w-4 mr-2" />
                Sélectionner un fichier
              </Button>
            </label>
          </>
        )}
      </div>
    </div>
  );
};

export const DocumentsSection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          name="cvFile"
          render={() => (
            <FormItem>
              <FileUpload
                name="cvFile"
                label={t('uploadCV')}
                accept=".pdf,.doc,.docx"
              />
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="diplomaFile"
          render={() => (
            <FormItem>
              <FileUpload
                name="diplomaFile"
                label={t('uploadDiploma')}
                accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
              />
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        name="idFile"
        render={() => (
          <FormItem>
            <FileUpload
              name="idFile"
              label={t('uploadID')}
              accept=".pdf,.jpg,.jpeg,.png"
            />
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-800">
          <strong>📄 Formats acceptés :</strong> PDF, DOC, DOCX, JPG, PNG (max 10MB par fichier)
        </p>
      </div>
    </div>
  );
};