import React from 'react';
import { Stack } from 'expo-router';

export default function ConsultationLayout() {
  return (
    <Stack>
      <Stack.Screen 
        name="age" 
        options={{ 
          headerTitle: 'Age',
          headerShown: true 
        }} 
      />
      <Stack.Screen 
        name="gender" 
        options={{ 
          headerTitle: 'Gender',
          headerShown: true 
        }} 
      />
      <Stack.Screen 
        name="medical-conditions" 
        options={{ 
          headerTitle: 'Medical Conditions',
          headerShown: true 
        }} 
      />
      <Stack.Screen 
        name="conditions-selector" 
        options={{ 
            headerTitle: 'Medical Conditions',
            headerShown: true 
        }} 
        />
        <Stack.Screen 
        name="feelings" 
        options={{ 
            headerTitle: 'How are you feeling?',
            headerShown: true 
        }} 
        />
        <Stack.Screen 
  name="medications" 
  options={{ 
    headerTitle: 'Medications',
    headerShown: true 
  }} 
/>
<Stack.Screen 
  name="medication-selector" 
  options={{ 
    headerTitle: 'Select Medications',
    headerShown: true 
  }} 
/>

<Stack.Screen 
  name="allergies" 
  options={{ 
    headerTitle: 'Allergies',
    headerShown: true 
  }} 
/>
    </Stack>
  );
}
