import React from 'react';
import { Stack } from 'expo-router';
import { ConsultationProvider } from '@/app/context/ConsultationContext';

export default function ConsultationLayout() {
  return (
    <ConsultationProvider>
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

<Stack.Screen 
  name="textual-analysis" 
  options={{ 
    headerTitle: 'Textual Analysis',
    headerShown: true 
  }} 
/>

<Stack.Screen 
  name="ai-response" 
  options={{ 
    headerTitle: 'AI Response',
    headerShown: true 
  }} 
/>
      </Stack>
    </ConsultationProvider>
  );
}
