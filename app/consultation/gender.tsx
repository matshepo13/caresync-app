import React from 'react';
import GenderInput from '@/components/consultation/GenderInput';
import { router } from 'expo-router';

export default function GenderScreen() {
  const handleGenderSubmit = (gender: 'male' | 'female') => {
    console.log('Selected gender:', gender);
    router.push('/consultation/medical-conditions' as any);
  };

  return <GenderInput onSubmit={handleGenderSubmit} />;
}
