import React from 'react';
import { router } from 'expo-router';
import AllergyInput from '@/components/consultation/AllergyInput';

export default function AllergiesScreen() {
  const handleSubmit = (hasAllergies: boolean) => {
    console.log('Has allergies:', hasAllergies);
    // Navigate to next screen or handle the response
  };

  return <AllergyInput onSubmit={handleSubmit} />;
}