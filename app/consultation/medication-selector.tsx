import React from 'react';
import { router } from 'expo-router';
import MedicationSelector from '@/components/consultation/MedicationSelector';

export default function MedicationSelectorScreen() {
  const handleSubmit = (medications: string[]) => {
    console.log('Selected medications:', medications);
    router.push('/consultation/next-step');
  };

  return <MedicationSelector onSubmit={handleSubmit} />;
}