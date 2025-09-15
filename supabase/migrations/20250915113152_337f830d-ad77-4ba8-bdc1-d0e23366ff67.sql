-- Create healthcare applications table
CREATE TABLE public.healthcare_applications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID,
  full_name TEXT NOT NULL,
  date_of_birth DATE NOT NULL,
  gender TEXT NOT NULL CHECK (gender IN ('male', 'female', 'other')),
  nationality TEXT NOT NULL,
  current_country TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  profession TEXT NOT NULL CHECK (profession IN ('nurse', 'caregiver')),
  experience TEXT NOT NULL,
  current_employer TEXT,
  specialized_skills TEXT[] NOT NULL DEFAULT '{}',
  languages_spoken TEXT[] NOT NULL DEFAULT '{}',
  available_from DATE NOT NULL,
  preferred_region TEXT,
  contract_type TEXT NOT NULL CHECK (contract_type IN ('cdd', 'cdi', 'interim')),
  gdpr_consent BOOLEAN NOT NULL DEFAULT false,
  application_status TEXT NOT NULL DEFAULT 'pending' CHECK (application_status IN ('pending', 'reviewing', 'approved', 'rejected')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.healthcare_applications ENABLE ROW LEVEL SECURITY;

-- Create policies for healthcare applications
CREATE POLICY "Users can view their own applications" 
ON public.healthcare_applications 
FOR SELECT 
USING (auth.uid() = user_id OR user_id IS NULL);

CREATE POLICY "Anyone can create applications" 
ON public.healthcare_applications 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Users can update their own applications" 
ON public.healthcare_applications 
FOR UPDATE 
USING (auth.uid() = user_id);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_healthcare_applications_updated_at
BEFORE UPDATE ON public.healthcare_applications
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create indexes for better performance
CREATE INDEX idx_healthcare_applications_user_id ON public.healthcare_applications(user_id);
CREATE INDEX idx_healthcare_applications_status ON public.healthcare_applications(application_status);
CREATE INDEX idx_healthcare_applications_created_at ON public.healthcare_applications(created_at);