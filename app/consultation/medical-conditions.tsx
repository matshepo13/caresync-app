import React from 'react';
import { router } from 'expo-router';
import MedicalConditionsInput from '@/components/consultation/MedicalConditionsInput';

export default function MedicalConditionsScreen() {
  const handleSubmit = (hasMedicalConditions: boolean | null) => {
    console.log('Has medical conditions:', hasMedicalConditions);
    // Navigate to next screen or handle the response
    // router.push('/consultation/next-screen');
  };

  return <MedicalConditionsInput onSubmit={handleSubmit} />;
}