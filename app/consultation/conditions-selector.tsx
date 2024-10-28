import React from 'react';
import { router } from 'expo-router';
import MedicalConditionsSelector from '@/components/consultation/MedicalConditionsSelector';

export default function ConditionsSelectorScreen() {
  const handleSubmit = (conditions: string[]) => {
    console.log('Selected conditions:', conditions);
    // Navigate to feelings screen
    router.push('/consultation/feelings');
  };

  return <MedicalConditionsSelector onSubmit={handleSubmit} />;
}