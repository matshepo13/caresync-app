import React from 'react';
import { router } from 'expo-router';
import MedicationInput from '@/components/consultation/MedicationInput';

export default function MedicationsScreen() {
  const handleSubmit = (takesMedications: boolean) => {
    console.log('Takes medications:', takesMedications);
    // Navigate to next screen
    router.push('/consultation/next-step' as const);
  };

  return <MedicationInput onSubmit={handleSubmit} />;
}