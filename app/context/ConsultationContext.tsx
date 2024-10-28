import React, { createContext, useContext, useState } from 'react';

interface ConsultationData {
  age?: string;
  gender?: 'male' | 'female';
  medicalConditions?: string[];
  feeling?: string;
  medications?: string[];
  allergies?: {
    hasAllergies: boolean;
    selectedTypes?: string[];
  };
  symptoms?: string;
}

interface ConsultationContextType {
  consultationData: ConsultationData;
  updateConsultationData: (data: Partial<ConsultationData>) => void;
}

const ConsultationContext = createContext<ConsultationContextType | undefined>(undefined);

export function ConsultationProvider({ children }: { children: React.ReactNode }) {
  const [consultationData, setConsultationData] = useState<ConsultationData>({});

  const updateConsultationData = (data: Partial<ConsultationData>) => {
    setConsultationData(prev => ({ ...prev, ...data }));
  };

  return (
    <ConsultationContext.Provider value={{ consultationData, updateConsultationData }}>
      {children}
    </ConsultationContext.Provider>
  );
}

export const useConsultation = () => {
  const context = useContext(ConsultationContext);
  if (!context) {
    throw new Error('useConsultation must be used within a ConsultationProvider');
  }
  return context;
};
