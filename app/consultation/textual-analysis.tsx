import React from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import TextualAnalysis from '@/components/consultation/TextualAnalysis';

export default function TextualAnalysisScreen() {
  const params = useLocalSearchParams<{
    hasAllergies: string;
    selectedTypes?: string;
  }>();

  const allergies = {
    hasAllergies: params.hasAllergies === 'true',
    selectedTypes: params.selectedTypes?.split(','),
  };

  const handleSubmit = (symptoms: string) => {
    console.log('Analysis:', symptoms);
    console.log('Allergies:', allergies);
    router.push('/consultation/next-step');
  };

  return <TextualAnalysis onSubmit={handleSubmit} allergies={allergies} />;
}