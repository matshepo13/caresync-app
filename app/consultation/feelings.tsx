import React from 'react';
import { router } from 'expo-router';
import FeelingSelector from '@/components/consultation/FeelingSelector';

export default function FeelingsScreen() {
  const handleSubmit = (feeling: string) => {
    console.log('Selected feeling:', feeling);
    // router.push('/consultation/next-step');
  };

  return <FeelingSelector onSubmit={handleSubmit} />;
}